import { useState, useEffect, useCallback } from 'react';
import { Profile, Appearance, ProfileErrors } from '../types/profile';
import { validateField, validateProfile } from '../utils/validation';
import { loadDraft, saveDraft, isStorageEnabled, setStorageEnabled, clearDraft } from '../utils/storage';

export const INITIAL_PROFILE: Profile = {
  name: 'Alex Morgan',
  role: 'Design Technologist & Frontend Architect',
  bio: 'Crafting thoughtful digital interfaces at the intersection of typography, high performance, and human interaction.',
  imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
  location: 'San Francisco, CA',
  email: 'alex.morgan@identitystudio.design',
  website: 'https://alexmorgan.design',
  linkedin: 'https://linkedin.com/in/alexmorgan-design',
  github: 'https://github.com/alexmorgan',
};

export const EMPTY_PROFILE: Profile = {
  name: '',
  role: '',
  bio: '',
  imageUrl: '',
  location: '',
  email: '',
  website: '',
  linkedin: '',
  github: '',
};

export const INITIAL_APPEARANCE: Appearance = {
  theme: 'obsidian',
  template: 'editorial',
  corners: 'subtle',
  fontStyle: 'serif',
};

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() => {
    const draft = loadDraft();
    return draft ? draft.profile : INITIAL_PROFILE;
  });

  const [appearance, setAppearance] = useState<Appearance>(() => {
    const draft = loadDraft();
    return draft ? draft.appearance : INITIAL_APPEARANCE;
  });

  const [errors, setErrors] = useState<ProfileErrors>({});
  const [storageActive, setStorageActive] = useState<boolean>(() => isStorageEnabled());
  const [isDraftRestored] = useState<boolean>(() => !!loadDraft());

  // Auto-save to LocalStorage whenever profile or appearance changes
  useEffect(() => {
    if (storageActive) {
      saveDraft(profile, appearance);
    }
  }, [profile, appearance, storageActive]);

  // Update a single field with live validation
  const updateField = useCallback((field: keyof Profile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Real-time validation for this field
    const fieldError = validateField(field, value);
    setErrors((prev) => {
      const updated = { ...prev };
      if (fieldError) {
        updated[field] = fieldError;
      } else {
        delete updated[field];
      }
      return updated;
    });
  }, []);

  // Update appearance settings
  const updateAppearance = useCallback((patch: Partial<Appearance>) => {
    setAppearance((prev) => ({
      ...prev,
      ...patch,
    }));
  }, []);

  // Load sample profile
  const loadSample = useCallback(() => {
    setProfile(INITIAL_PROFILE);
    setAppearance(INITIAL_APPEARANCE);
    setErrors({});
  }, []);

  // Reset to empty profile
  const resetForm = useCallback(() => {
    setProfile(EMPTY_PROFILE);
    setAppearance(INITIAL_APPEARANCE);
    setErrors({});
    clearDraft();
  }, []);

  // Toggle storage
  const toggleStorage = useCallback((enabled: boolean) => {
    setStorageEnabled(enabled);
    setStorageActive(enabled);
  }, []);

  // Validate entire profile before critical actions
  const validateAll = useCallback((): boolean => {
    const newErrors = validateProfile(profile);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [profile]);

  return {
    profile,
    appearance,
    errors,
    storageActive,
    isDraftRestored,
    updateField,
    updateAppearance,
    loadSample,
    resetForm,
    toggleStorage,
    validateAll,
  };
}
