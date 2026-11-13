import React, { useState } from 'react';
import { Profile, Appearance, ThemeType, CornerRadius, FontStyle } from '../types/profile';
import { MapPin, Mail, Globe, Sparkles, ShieldCheck, User } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

interface ProfileCardProps {
  profile: Profile;
  appearance: Appearance;
  cardId?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  appearance,
  cardId = 'profile-card',
}) => {
  const [imageError, setImageError] = useState(false);

  const { theme, template, corners, fontStyle } = appearance;

  // Extract initials for fallback avatar
  const getInitials = (name: string) => {
    if (!name.trim()) return 'ID';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Theme style configurations
  const getThemeClasses = (t: ThemeType) => {
    switch (t) {
      case 'obsidian':
        return {
          cardBg: 'bg-[#17251F]',
          cardBorder: 'border-[#263C32]',
          textPrimary: 'text-[#F2EBDD]',
          textSecondary: 'text-[#96A69D]',
          textMuted: 'text-[#687B72]',
          accentText: 'text-[#B99A6A]',
          accentBg: 'bg-[#B99A6A]',
          accentBorder: 'border-[#B99A6A]/30',
          chipBg: 'bg-[#20332B] hover:bg-[#284036]',
          chipBorder: 'border-[#2D453A]',
          chipText: 'text-[#E5DCB]',
          divider: 'border-[#283E34]',
          watermark: 'text-[#20332B]',
          avatarRing: 'ring-[#B99A6A]',
        };
      case 'ivory':
        return {
          cardBg: 'bg-[#F2EBDD]',
          cardBorder: 'border-[#D9CFBC]',
          textPrimary: 'text-[#1B2420]',
          textSecondary: 'text-[#4A554F]',
          textMuted: 'text-[#7D8880]',
          accentText: 'text-[#17251F]',
          accentBg: 'bg-[#17251F]',
          accentBorder: 'border-[#17251F]/20',
          chipBg: 'bg-[#E6DEC9] hover:bg-[#DCD3BD]',
          chipBorder: 'border-[#D0C5AD]',
          chipText: 'text-[#202B25]',
          divider: 'border-[#D6CCB8]',
          watermark: 'text-[#E6DEC9]',
          avatarRing: 'ring-[#17251F]',
        };
      case 'charcoal':
        return {
          cardBg: 'bg-[#181B1E]',
          cardBorder: 'border-[#2C3138]',
          textPrimary: 'text-[#F0F3F5]',
          textSecondary: 'text-[#98A2AE]',
          textMuted: 'text-[#626C78]',
          accentText: 'text-[#C5A87B]',
          accentBg: 'bg-[#C5A87B]',
          accentBorder: 'border-[#C5A87B]/30',
          chipBg: 'bg-[#24292F] hover:bg-[#2D333B]',
          chipBorder: 'border-[#363D47]',
          chipText: 'text-[#E1E5EA]',
          divider: 'border-[#282D35]',
          watermark: 'text-[#24292F]',
          avatarRing: 'ring-[#C5A87B]',
        };
      case 'sand':
        return {
          cardBg: 'bg-[#EFECE6]',
          cardBorder: 'border-[#D8D2C4]',
          textPrimary: 'text-[#2C2420]',
          textSecondary: 'text-[#61544E]',
          textMuted: 'text-[#8C7E76]',
          accentText: 'text-[#A86542]',
          accentBg: 'bg-[#A86542]',
          accentBorder: 'border-[#A86542]/30',
          chipBg: 'bg-[#E2DDD2] hover:bg-[#D8D2C4]',
          chipBorder: 'border-[#CEC6B7]',
          chipText: 'text-[#382F2A]',
          divider: 'border-[#DDD7C9]',
          watermark: 'text-[#E2DDD2]',
          avatarRing: 'ring-[#A86542]',
        };
    }
  };

  const getCornerClass = (c: CornerRadius) => {
    switch (c) {
      case 'sharp':
        return 'rounded-none';
      case 'subtle':
        return 'rounded-2xl';
      case 'rounded':
        return 'rounded-3xl';
    }
  };

  const getFontFamilyClasses = (f: FontStyle) => {
    switch (f) {
      case 'serif':
        return {
          heading: 'font-serif',
          body: 'font-serif',
          meta: 'font-mono',
        };
      case 'sans':
        return {
          heading: 'font-sans font-bold',
          body: 'font-sans',
          meta: 'font-mono',
        };
      case 'mixed':
        return {
          heading: 'font-serif',
          body: 'font-sans',
          meta: 'font-mono',
        };
    }
  };

  const colors = getThemeClasses(theme);
  const cornerClass = getCornerClass(corners);
  const fonts = getFontFamilyClasses(fontStyle);

  const showAvatarImage = Boolean(profile.imageUrl && !imageError);
  const displayName = profile.name || 'Your Name';
  const displayRole = profile.role || 'Professional Title';
  const displayBio = profile.bio || 'Your thoughtful digital biography and personal summary will be rendered here with elegant typography.';
  const displayLocation = profile.location || 'Location';

  // Render Avatar Element
  const renderAvatar = (sizeClass: string, textClass: string) => {
    return (
      <div
        className={`relative ${sizeClass} flex-shrink-0 overflow-hidden rounded-full border-2 ${colors.cardBorder} shadow-md flex items-center justify-center bg-black/10`}
      >
        {showAvatarImage ? (
          <img
            src={profile.imageUrl}
            alt={displayName}
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center ${colors.cardBg} ${colors.textPrimary}`}>
            {profile.name ? (
              <span className={`font-serif font-bold ${textClass} tracking-wider`}>
                {getInitials(profile.name)}
              </span>
            ) : (
              <User className="w-1/2 h-1/2 opacity-70" />
            )}
          </div>
        )}
      </div>
    );
  };

  // Render Social and Contact Badges
  const renderSocialBadges = (isCompact = false) => {
    const hasAnySocial = profile.email || profile.website || profile.linkedin || profile.github;
    if (!hasAnySocial) {
      return (
        <div className={`text-[11px] ${colors.textMuted} italic flex items-center gap-1.5`}>
          <span>Social links will appear here once entered</span>
        </div>
      );
    }

    return (
      <div className={`flex flex-wrap gap-2 ${isCompact ? 'text-[11px]' : 'text-xs'}`}>
        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${colors.chipBorder} ${colors.chipBg} ${colors.chipText} transition-colors`}
          >
            <Mail className="w-3.5 h-3.5 opacity-80" />
            <span className="font-medium truncate max-w-[170px]">{profile.email}</span>
          </a>
        )}

        {profile.website && (
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${colors.chipBorder} ${colors.chipBg} ${colors.chipText} transition-colors`}
          >
            <Globe className="w-3.5 h-3.5 opacity-80" />
            <span className="font-medium truncate max-w-[150px]">
              {profile.website.replace(/^https?:\/\//i, '').replace(/\/$/, '')}
            </span>
          </a>
        )}

        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${colors.chipBorder} ${colors.chipBg} ${colors.chipText} transition-colors`}
          >
            <LinkedinIcon className="w-3.5 h-3.5 opacity-80" />
            <span className="font-medium">LinkedIn</span>
          </a>
        )}

        {profile.github && (
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${colors.chipBorder} ${colors.chipBg} ${colors.chipText} transition-colors`}
          >
            <GithubIcon className="w-3.5 h-3.5 opacity-80" />
            <span className="font-medium">GitHub</span>
          </a>
        )}
      </div>
    );
  };

  /* ========================================================================= */
  /* TEMPLATE 1: EDITORIAL (Signature Asymmetric, High Typography)            */
  /* ========================================================================= */
  if (template === 'editorial') {
    return (
      <div
        id={cardId}
        className={`w-full max-w-[620px] mx-auto p-8 sm:p-10 border shadow-2xl relative overflow-hidden transition-all duration-300 ${colors.cardBg} ${colors.cardBorder} ${cornerClass}`}
      >
        {/* Subtle decorative background watermark */}
        <div
          className={`absolute -right-8 -top-12 text-[140px] font-serif font-black select-none pointer-events-none opacity-5 ${colors.watermark}`}
        >
          IDENTITY
        </div>

        {/* Top Header Row with Metadata stamp */}
        <div className="flex items-center justify-between pb-6 mb-7 border-b border-dashed" style={{ borderColor: 'currentColor', opacity: 0.25 }}>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${colors.accentBg}`} />
            <span className={`text-[11px] uppercase tracking-[0.25em] ${fonts.meta} ${colors.accentText} font-semibold`}>
              IDENTITY STUDIO • VOL. I
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className={`w-3.5 h-3.5 ${colors.accentText}`} />
            <span className={`text-[10px] ${fonts.meta} uppercase tracking-wider ${colors.textMuted}`}>
              VERIFIED PRESENCE
            </span>
          </div>
        </div>

        {/* Asymmetrical Layout: Avatar + Big Name Block */}
        <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-7 mb-7">
          <div className="relative">
            {renderAvatar('w-24 h-24 sm:w-28 sm:h-28 ring-4 ' + colors.avatarRing + ' ring-offset-2 ring-offset-transparent', 'text-2xl')}
            <div className={`absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold ${fonts.meta} ${colors.accentBg} text-obsidian shadow`}>
              PORTFOLIO
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-1.5 pt-1">
            <div className={`text-[11px] uppercase tracking-widest font-semibold ${fonts.meta} ${colors.accentText}`}>
              DIGITAL IDENTITY CARD
            </div>
            <h2 className={`text-3xl sm:text-4xl ${fonts.heading} ${colors.textPrimary} tracking-tight font-bold leading-tight break-words`}>
              {displayName}
            </h2>
            <p className={`text-base sm:text-lg ${colors.textSecondary} font-medium tracking-wide break-words`}>
              {displayRole}
            </p>
            {profile.location && (
              <div className={`flex items-center gap-1.5 text-xs ${colors.textMuted} pt-1`}>
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{displayLocation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Biography Block with Editorial Quote Accent */}
        <div className="relative mb-7 pl-4 border-l-2" style={{ borderColor: 'currentColor' }}>
          <p className={`text-sm sm:text-base leading-relaxed ${colors.textPrimary} ${fonts.body} opacity-95 break-words`}>
            {displayBio}
          </p>
        </div>

        {/* Social and Contact Badges */}
        <div className="pt-4 border-t" style={{ borderColor: 'currentColor', opacity: 0.15 }}>
          {renderSocialBadges()}
        </div>

        {/* Bottom Editorial Stamp */}
        <div className="mt-8 pt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]" style={{ opacity: 0.5 }}>
          <span className={fonts.meta}>SERIAL // 2026-IS-PASS</span>
          <span className={fonts.meta}>AUTONOMOUS CLIENT-SIDE</span>
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* TEMPLATE 2: CLASSIC (Symmetrical, Executive, Balanced)                    */
  /* ========================================================================= */
  if (template === 'classic') {
    return (
      <div
        id={cardId}
        className={`w-full max-w-[560px] mx-auto p-8 sm:p-10 border shadow-2xl relative text-center transition-all duration-300 ${colors.cardBg} ${colors.cardBorder} ${cornerClass}`}
      >
        {/* Subtle framed inner border */}
        <div className="absolute inset-2.5 sm:inset-3 border border-current opacity-10 pointer-events-none rounded-[inherit]" />

        {/* Top subtle emblem */}
        <div className="flex justify-center items-center gap-1 mb-5">
          <Sparkles className={`w-4 h-4 ${colors.accentText}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${fonts.meta} ${colors.accentText}`}>
            OFFICIAL PROFILE
          </span>
          <Sparkles className={`w-4 h-4 ${colors.accentText}`} />
        </div>

        {/* Centered Avatar with Ring */}
        <div className="flex justify-center mb-5">
          {renderAvatar('w-28 h-28 ring-4 ' + colors.avatarRing + ' ring-offset-4 ring-offset-transparent', 'text-3xl')}
        </div>

        {/* Name and Designation */}
        <div className="space-y-1 mb-4">
          <h2 className={`text-2xl sm:text-3xl ${fonts.heading} ${colors.textPrimary} font-bold tracking-tight break-words`}>
            {displayName}
          </h2>
          <p className={`text-sm sm:text-base ${colors.accentText} font-medium tracking-wide break-words`}>
            {displayRole}
          </p>
          {profile.location && (
            <div className={`flex items-center justify-center gap-1 text-xs ${colors.textMuted} pt-1`}>
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{displayLocation}</span>
            </div>
          )}
        </div>

        {/* Elegant Horizontal Divider */}
        <div className="flex items-center justify-center gap-3 my-5">
          <div className="h-[1px] w-16 bg-current opacity-20" />
          <div className={`w-1.5 h-1.5 rotate-45 ${colors.accentBg}`} />
          <div className="h-[1px] w-16 bg-current opacity-20" />
        </div>

        {/* Bio */}
        <p className={`text-sm leading-relaxed max-w-md mx-auto ${colors.textSecondary} ${fonts.body} mb-7 break-words`}>
          {displayBio}
        </p>

        {/* Centered Socials */}
        <div className="flex justify-center pt-2">
          {renderSocialBadges()}
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* TEMPLATE 3: COMPACT (Dense Executive Networking Badge)                    */
  /* ========================================================================= */
  return (
    <div
      id={cardId}
      className={`w-full max-w-[620px] mx-auto p-6 sm:p-7 border shadow-xl relative transition-all duration-300 ${colors.cardBg} ${colors.cardBorder} ${cornerClass}`}
    >
      {/* Top Banner Bar */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b" style={{ borderColor: 'currentColor', opacity: 0.15 }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className={`text-[10px] font-mono uppercase tracking-widest ${colors.textMuted} font-semibold`}>
            IDENTITY BADGE // ACTIVE
          </span>
        </div>
        <span className={`text-[10px] font-mono uppercase tracking-wider ${colors.accentText} font-semibold`}>
          NFC • READY
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {renderAvatar('w-20 h-20 ring-2 ' + colors.avatarRing, 'text-xl')}
        </div>

        {/* Content details */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
            <h2 className={`text-xl sm:text-2xl ${fonts.heading} ${colors.textPrimary} font-bold tracking-tight truncate`}>
              {displayName}
            </h2>
            {profile.location && (
              <span className={`inline-flex items-center gap-1 text-[11px] ${colors.textMuted}`}>
                <MapPin className="w-3 h-3" />
                <span className="truncate">{displayLocation}</span>
              </span>
            )}
          </div>

          <p className={`text-xs sm:text-sm font-medium ${colors.accentText} mb-2.5`}>
            {displayRole}
          </p>

          <p className={`text-xs ${colors.textSecondary} leading-relaxed ${fonts.body} mb-4 line-clamp-2 break-words`}>
            {displayBio}
          </p>

          <div>{renderSocialBadges(true)}</div>
        </div>
      </div>
    </div>
  );
};
