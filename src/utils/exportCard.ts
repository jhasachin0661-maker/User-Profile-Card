import { toPng } from 'html-to-image';
import { Profile } from '../types/profile';

export async function exportCardAsPng(
  elementId: string = 'profile-card',
  fileName: string = 'identity-card.png'
): Promise<{ success: boolean; error?: string }> {
  const node = document.getElementById(elementId);
  if (!node) {
    return { success: false, error: 'Profile card element could not be found in the DOM.' };
  }

  try {
    // Ensure document fonts are loaded before capturing
    if (document.fonts) {
      await document.fonts.ready;
    }

    // Capture at 2x pixel ratio for retina-ready crispness
    const dataUrl = await toPng(node, {
      pixelRatio: 2,
      cacheBust: true,
      filter: (childNode) => {
        // Exclude elements marked with data-export-ignore if any
        if (childNode instanceof HTMLElement && childNode.dataset.exportIgnore) {
          return false;
        }
        return true;
      },
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { success: true };
  } catch (err: unknown) {
    console.error('Failed to export profile card as PNG:', err);
    let errorMessage = 'Failed to generate PNG image.';
    if (err instanceof Error) {
      if (err.message.includes('CORS') || err.message.includes('cross-origin') || err.message.includes('tainted')) {
        errorMessage = 'External image blocked by CORS security policy. Try using an image hosted with CORS enabled (e.g., Unsplash, GitHub avatars) or remove the image URL.';
      } else {
        errorMessage = err.message;
      }
    }
    return { success: false, error: errorMessage };
  }
}

export async function copyProfileDetails(profile: Profile): Promise<boolean> {
  const lines: string[] = [
    `NAME: ${profile.name}`,
    profile.role ? `ROLE: ${profile.role}` : '',
    profile.location ? `LOCATION: ${profile.location}` : '',
    profile.bio ? `BIO: ${profile.bio}` : '',
    profile.email ? `EMAIL: ${profile.email}` : '',
    profile.website ? `WEBSITE: ${profile.website}` : '',
    profile.linkedin ? `LINKEDIN: ${profile.linkedin}` : '',
    profile.github ? `GITHUB: ${profile.github}` : '',
  ].filter(Boolean);

  const textToCopy = lines.join('\n');

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(textToCopy);
      return true;
    } else {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    }
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    return false;
  }
}

export async function shareProfile(profile: Profile): Promise<{ shared: boolean; fallbackCopied?: boolean; error?: string }> {
  const shareData = {
    title: `${profile.name} — Profile Card`,
    text: `${profile.name}${profile.role ? ` • ${profile.role}` : ''}\n${profile.bio || ''}`,
    url: profile.website || window.location.href,
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { shared: true };
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return { shared: false };
      }
    }
  }

  // Graceful fallback: copy profile details to clipboard
  const copied = await copyProfileDetails(profile);
  return { shared: false, fallbackCopied: copied };
}

