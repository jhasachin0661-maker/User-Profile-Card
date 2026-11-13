import React from 'react';
import { Profile, ProfileErrors } from '../types/profile';
import { ImageInput } from './ImageInput';
import {
  User,
  Briefcase,
  FileText,
  MapPin,
  Mail,
  Globe,
  RotateCcw,
  Sparkles,
  HardDrive,
  AlertCircle
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

interface ProfileFormProps {
  profile: Profile;
  errors: ProfileErrors;
  storageActive: boolean;
  onUpdateField: (field: keyof Profile, value: string) => void;
  onLoadSample: () => void;
  onReset: () => void;
  onToggleStorage: (enabled: boolean) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  errors,
  storageActive,
  onUpdateField,
  onLoadSample,
  onReset,
  onToggleStorage,
}) => {
  const bioLength = profile.bio.length;
  const maxBio = 180;

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-[#DDD6C8] rounded-2xl p-6 sm:p-7 shadow-sm space-y-7">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E8E1D5]">
        <div>
          <h2 className="text-xl font-serif font-bold text-obsidian tracking-tight">
            Profile Details
          </h2>
          <p className="text-xs text-muted mt-0.5">
            Fill in your information. All updates reflect instantly on the card.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brass/50 bg-brass/10 hover:bg-brass/20 text-obsidian text-xs font-semibold transition-colors"
            title="Populate with sample data"
          >
            <Sparkles className="w-3.5 h-3.5 text-brass" />
            <span>Load Sample</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all fields and start fresh?')) {
                onReset();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DDD6C8] bg-white hover:bg-red-50 hover:border-red-200 text-muted hover:text-red-700 text-xs font-medium transition-colors"
            title="Clear all fields"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5" noValidate>
        {/* Full Name (Required) */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-obsidian">
              Full Name <span className="text-red-600">*</span>
            </label>
            <span className="text-[11px] text-muted">2–50 chars</span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
              <User className="w-4 h-4" />
            </div>
            <input
              id="name"
              type="text"
              required
              maxLength={50}
              value={profile.name}
              onChange={(e) => onUpdateField('name', e.target.value)}
              placeholder="e.g. Alex Morgan"
              className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white border rounded-lg shadow-sm transition-colors focus:outline-none ${
                errors.name
                  ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-[#DDD6C8] focus:border-brass focus:ring-1 focus:ring-brass'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Role / Designation */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="role" className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Role / Designation <span className="text-muted/60 font-normal lowercase">(optional)</span>
            </label>
            <span className="text-[11px] text-muted">max 60 chars</span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
              <Briefcase className="w-4 h-4" />
            </div>
            <input
              id="role"
              type="text"
              maxLength={60}
              value={profile.role}
              onChange={(e) => onUpdateField('role', e.target.value)}
              placeholder="e.g. Design Technologist & Frontend Architect"
              className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white border rounded-lg shadow-sm transition-colors focus:outline-none ${
                errors.role
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-[#DDD6C8] focus:border-brass focus:ring-1 focus:ring-brass'
              }`}
            />
          </div>
          {errors.role && (
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.role}
            </p>
          )}
        </div>

        {/* Bio with Live Character Counter */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="bio" className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Biography / Summary <span className="text-muted/60 font-normal lowercase">(optional)</span>
            </label>
            <span
              className={`text-[11px] font-mono ${
                bioLength > maxBio ? 'text-red-600 font-semibold' : 'text-muted'
              }`}
            >
              {bioLength}/{maxBio}
            </span>
          </div>
          <div className="relative">
            <div className="absolute top-2.5 left-3 pointer-events-none text-muted">
              <FileText className="w-4 h-4" />
            </div>
            <textarea
              id="bio"
              rows={3}
              maxLength={maxBio}
              value={profile.bio}
              onChange={(e) => onUpdateField('bio', e.target.value)}
              placeholder="A concise synopsis of your professional identity, mission, or aesthetic..."
              className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg shadow-sm transition-colors focus:outline-none resize-none leading-relaxed ${
                errors.bio
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-[#DDD6C8] focus:border-brass focus:ring-1 focus:ring-brass'
              }`}
            />
          </div>
          {errors.bio && (
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.bio}
            </p>
          )}
        </div>

        {/* Avatar Image URL component */}
        <ImageInput
          value={profile.imageUrl}
          name={profile.name}
          error={errors.imageUrl}
          onChange={(val) => onUpdateField('imageUrl', val)}
        />

        {/* Location & Email (Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Location */}
          <div className="space-y-1.5">
            <label htmlFor="location" className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Location <span className="text-muted/60 font-normal lowercase">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                id="location"
                type="text"
                maxLength={60}
                value={profile.location}
                onChange={(e) => onUpdateField('location', e.target.value)}
                placeholder="San Francisco, CA"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg shadow-sm transition-colors focus:outline-none ${
                  errors.location
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-[#DDD6C8] focus:border-brass focus:ring-1 focus:ring-brass'
                }`}
              />
            </div>
            {errors.location && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.location}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Email Address <span className="text-muted/60 font-normal lowercase">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                value={profile.email || ''}
                onChange={(e) => onUpdateField('email', e.target.value)}
                placeholder="you@example.com"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg shadow-sm transition-colors focus:outline-none ${
                  errors.email
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-[#DDD6C8] focus:border-brass focus:ring-1 focus:ring-brass'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Links section */}
        <div className="pt-2 border-t border-[#E8E1D5] space-y-4">
          <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
            Online Presence & Social Links
          </span>

          {/* Website */}
          <div className="space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                <Globe className="w-4 h-4" />
              </div>
              <input
                id="website"
                type="url"
                value={profile.website || ''}
                onChange={(e) => onUpdateField('website', e.target.value)}
                placeholder="Website: https://yourdomain.com"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg shadow-sm transition-colors focus:outline-none ${
                  errors.website
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-[#DDD6C8] focus:border-brass focus:ring-1 focus:ring-brass'
                }`}
              />
            </div>
            {errors.website && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.website}
              </p>
            )}
          </div>

          {/* LinkedIn */}
          <div className="space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              <input
                id="linkedin"
                type="url"
                value={profile.linkedin || ''}
                onChange={(e) => onUpdateField('linkedin', e.target.value)}
                placeholder="LinkedIn: https://linkedin.com/in/username"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg shadow-sm transition-colors focus:outline-none ${
                  errors.linkedin
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-[#DDD6C8] focus:border-brass focus:ring-1 focus:ring-brass'
                }`}
              />
            </div>
            {errors.linkedin && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.linkedin}
              </p>
            )}
          </div>

          {/* GitHub */}
          <div className="space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                <GithubIcon className="w-4 h-4" />
              </div>
              <input
                id="github"
                type="url"
                value={profile.github || ''}
                onChange={(e) => onUpdateField('github', e.target.value)}
                placeholder="GitHub: https://github.com/username"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg shadow-sm transition-colors focus:outline-none ${
                  errors.github
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-[#DDD6C8] focus:border-brass focus:ring-1 focus:ring-brass'
                }`}
              />
            </div>
            {errors.github && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.github}
              </p>
            )}
          </div>
        </div>

        {/* LocalStorage persistence preference */}
        <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between text-xs">
          <label htmlFor="save-draft-toggle" className="flex items-center gap-2 cursor-pointer select-none">
            <HardDrive className="w-4 h-4 text-brass" />
            <span className="text-ink font-medium">Auto-save draft in browser</span>
          </label>
          <input
            id="save-draft-toggle"
            type="checkbox"
            checked={storageActive}
            onChange={(e) => onToggleStorage(e.target.checked)}
            className="w-4 h-4 text-brass rounded border-[#DDD6C8] focus:ring-brass cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};
