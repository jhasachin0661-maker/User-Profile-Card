import { Profile, ProfileErrors } from '../types/profile';

const URL_PATTERN = /^(https?:\/\/)([\w.-]+)+(:\d+)?(\/[^\s]*)?$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateField(field: keyof Profile, value: string): string | null {
  const trimmed = value.trim();

  switch (field) {
    case 'name':
      if (!trimmed) {
        return 'Full name is required';
      }
      if (trimmed.length < 2) {
        return 'Name must be at least 2 characters';
      }
      if (trimmed.length > 50) {
        return 'Name cannot exceed 50 characters';
      }
      return null;

    case 'role':
      if (trimmed.length > 60) {
        return 'Role/Designation cannot exceed 60 characters';
      }
      return null;

    case 'bio':
      if (trimmed.length > 180) {
        return 'Biography cannot exceed 180 characters';
      }
      return null;

    case 'location':
      if (trimmed.length > 60) {
        return 'Location cannot exceed 60 characters';
      }
      return null;

    case 'email':
      if (trimmed && !EMAIL_PATTERN.test(trimmed)) {
        return 'Please enter a valid email address';
      }
      return null;

    case 'imageUrl':
      if (trimmed && !trimmed.startsWith('data:image/') && !URL_PATTERN.test(trimmed)) {
        return 'Please provide a valid image file or URL (http:// or https://)';
      }
      return null;

    case 'website':
    case 'linkedin':
    case 'github':
      if (trimmed && !URL_PATTERN.test(trimmed)) {
        return 'URL must start with http:// or https://';
      }
      return null;

    default:
      return null;
  }
}

export function validateProfile(profile: Profile): ProfileErrors {
  const errors: ProfileErrors = {};

  (Object.keys(profile) as Array<keyof Profile>).forEach((field) => {
    const error = validateField(field, profile[field] || '');
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}

export function isValidProfile(profile: Profile): boolean {
  const errors = validateProfile(profile);
  return Object.keys(errors).length === 0;
}

