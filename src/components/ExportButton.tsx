import React, { useState } from 'react';
import { Download, Share2, Copy, Check, Loader2 } from 'lucide-react';
import { exportCardAsPng, copyProfileDetails, shareProfile } from '../utils/exportCard';
import { Profile } from '../types/profile';

interface ExportButtonProps {
  profile: Profile;
  cardElementId?: string;
  onNotification: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  profile,
  cardElementId = 'profile-card',
  onNotification,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedRecently, setCopiedRecently] = useState(false);
  const [sharingRecently, setSharingRecently] = useState(false);

  const handleDownload = async () => {
    if (isExporting) return;
    setIsExporting(true);

    const safeFilename = `${(profile.name || 'identity-card').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-card.png`;

    try {
      const result = await exportCardAsPng(cardElementId, safeFilename);
      if (result.success) {
        onNotification('success', 'Card Downloaded', `Successfully exported 2x high-resolution PNG as ${safeFilename}`);
      } else {
        onNotification('error', 'Export Failed', result.error || 'Failed to generate PNG image.');
      }
    } catch {
      onNotification('error', 'Export Error', 'An unexpected error occurred during export.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyProfileDetails(profile);
    if (success) {
      setCopiedRecently(true);
      onNotification('success', 'Copied to Clipboard', 'Profile information copied formatted as text.');
      setTimeout(() => setCopiedRecently(false), 2000);
    } else {
      onNotification('error', 'Copy Failed', 'Could not copy to clipboard.');
    }
  };

  const handleShare = async () => {
    setSharingRecently(true);
    const res = await shareProfile(profile);
    setSharingRecently(false);

    if (res.shared) {
      onNotification('success', 'Shared Successfully', 'Card shared via native share.');
    } else if (res.fallbackCopied) {
      onNotification('info', 'Link & Profile Copied', 'Native sharing is not supported in this browser. Profile details copied to clipboard instead.');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Primary PNG Export Button */}
      <button
        type="button"
        onClick={handleDownload}
        disabled={isExporting}
        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-obsidian hover:bg-obsidian-light text-ivory font-medium text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-wait"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 text-brass animate-spin" />
            <span>Rendering High-Res PNG...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 text-brass" />
            <span>Download PNG (2x)</span>
          </>
        )}
      </button>

      {/* Copy Details Button */}
      <button
        type="button"
        onClick={handleCopy}
        title="Copy profile details as text"
        className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-lg border border-[#D5CDBC] bg-white/80 hover:bg-white text-ink text-sm font-medium transition-colors shadow-sm"
      >
        {copiedRecently ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline text-xs text-emerald-700">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-muted" />
            <span className="hidden sm:inline text-xs">Copy Details</span>
          </>
        )}
      </button>

      {/* Share Button */}
      <button
        type="button"
        onClick={handleShare}
        disabled={sharingRecently}
        title="Share profile card"
        className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-lg border border-[#D5CDBC] bg-white/80 hover:bg-white text-ink text-sm font-medium transition-colors shadow-sm"
      >
        <Share2 className="w-4 h-4 text-muted" />
        <span className="hidden sm:inline text-xs">Share</span>
      </button>
    </div>
  );
};

