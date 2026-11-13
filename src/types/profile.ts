export interface Profile {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  location: string;
  email?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export type ThemeType = 'obsidian' | 'ivory' | 'charcoal' | 'sand';

export type TemplateType = 'editorial' | 'classic' | 'compact';

export type CornerRadius = 'sharp' | 'subtle' | 'rounded';

export type FontStyle = 'serif' | 'sans' | 'mixed';

export interface Appearance {
  theme: ThemeType;
  template: TemplateType;
  corners: CornerRadius;
  fontStyle: FontStyle;
}

export type ProfileErrors = Partial<Record<keyof Profile, string>>;

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

