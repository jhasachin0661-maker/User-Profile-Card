import { Profile, Appearance } from '../types/profile';

const STORAGE_KEY_PROFILE = 'identity_studio_draft_profile';
const STORAGE_KEY_APPEARANCE = 'identity_studio_draft_appearance';
const STORAGE_KEY_ENABLED = 'identity_studio_storage_enabled';

export function isStorageEnabled(): boolean {
  try {
    const val = localStorage.getItem(STORAGE_KEY_ENABLED);
    return val !== 'false'; // default to enabled
  } catch {
    return false;
  }
}

export function setStorageEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY_ENABLED, String(enabled));
    if (!enabled) {
      clearDraft();
    }
  } catch {
    // localStorage might be unavailable or disabled
  }
}

export function saveDraft(profile: Profile, appearance: Appearance): boolean {
  if (!isStorageEnabled()) return false;
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    localStorage.setItem(STORAGE_KEY_APPEARANCE, JSON.stringify(appearance));
    return true;
  } catch (err) {
    console.warn('Failed to save draft to LocalStorage:', err);
    return false;
  }
}

export function loadDraft(): { profile: Profile; appearance: Appearance } | null {
  if (!isStorageEnabled()) return null;
  try {
    const profileRaw = localStorage.getItem(STORAGE_KEY_PROFILE);
    const appearanceRaw = localStorage.getItem(STORAGE_KEY_APPEARANCE);

    if (profileRaw && appearanceRaw) {
      return {
        profile: JSON.parse(profileRaw) as Profile,
        appearance: JSON.parse(appearanceRaw) as Appearance,
      };
    }
  } catch (err) {
    console.warn('Failed to parse draft from LocalStorage:', err);
  }
  return null;
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_PROFILE);
    localStorage.removeItem(STORAGE_KEY_APPEARANCE);
  } catch {
    // ignore
  }
}
