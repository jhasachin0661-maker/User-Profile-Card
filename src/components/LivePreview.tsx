import React, { useState } from 'react';
import { Profile, Appearance, ThemeType, CornerRadius, FontStyle, TemplateType } from '../types/profile';
import { ProfileCard } from './ProfileCard';
import { ThemeSelector } from './ThemeSelector';
import { TemplateSelector } from './TemplateSelector';
import { ExportButton } from './ExportButton';
import { Monitor, Smartphone, Sliders } from 'lucide-react';

interface LivePreviewProps {
  profile: Profile;
  appearance: Appearance;
  onThemeChange: (theme: ThemeType) => void;
  onTemplateChange: (template: TemplateType) => void;
  onCornersChange: (corners: CornerRadius) => void;
  onFontStyleChange: (fontStyle: FontStyle) => void;
  onNotification: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  profile,
  appearance,
  onThemeChange,
  onTemplateChange,
  onCornersChange,
  onFontStyleChange,
  onNotification,
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="space-y-6">
      {/* Top Preview Card Container */}
      <div className="bg-[#EFECE4] border border-[#DDD6C8] rounded-2xl overflow-hidden shadow-sm">
        {/* Workspace Toolbar */}
        <div className="bg-white/80 backdrop-blur-md px-5 py-3.5 border-b border-[#DDD6C8] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-obsidian font-semibold">
              Live Preview
            </span>
            <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-brass/10 text-obsidian font-mono">
              2x Canvas Ready
            </span>
          </div>

          {/* Viewport switch and Customize Toggle */}
          <div className="flex items-center gap-1.5 bg-[#EAE4D7] p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setDeviceView('desktop')}
              className={`p-1.5 rounded-md text-xs font-medium transition-all ${
                deviceView === 'desktop'
                  ? 'bg-white text-obsidian shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
              title="Desktop width"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceView('mobile')}
              className={`p-1.5 rounded-md text-xs font-medium transition-all ${
                deviceView === 'mobile'
                  ? 'bg-white text-obsidian shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
              title="Mobile viewport simulation"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Canvas Area */}
        <div className="p-4 sm:p-8 min-h-[440px] flex items-center justify-center bg-[radial-gradient(#C5BAA5_1px,transparent_1px)] [background-size:16px_16px] overflow-x-auto">
          <div
            className={`transition-all duration-300 w-full flex justify-center ${
              deviceView === 'mobile' ? 'max-w-[380px]' : 'max-w-2xl'
            }`}
          >
            <ProfileCard profile={profile} appearance={appearance} cardId="profile-card" />
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="bg-white/90 p-4 border-t border-[#DDD6C8]">
          <ExportButton profile={profile} cardElementId="profile-card" onNotification={onNotification} />
        </div>
      </div>

      {/* Customization Panel (Template, Theme, Corners, Typography) */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#DDD6C8] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brass" />
            <h3 className="text-base font-serif font-bold text-obsidian tracking-tight">
              Aesthetic Customizer
            </h3>
          </div>
          <span className="text-[11px] font-mono uppercase text-muted">
            Theme: <span className="font-semibold text-obsidian capitalize">{appearance.theme}</span> • Template: <span className="font-semibold text-obsidian capitalize">{appearance.template}</span>
          </span>
        </div>

        {/* Template Selector */}
        <TemplateSelector
          currentTemplate={appearance.template}
          onTemplateChange={onTemplateChange}
        />

        {/* Theme and Corners */}
        <div className="pt-2 border-t border-[#E8E1D5]">
          <ThemeSelector
            currentTheme={appearance.theme}
            currentCorners={appearance.corners}
            currentFontStyle={appearance.fontStyle}
            onThemeChange={onThemeChange}
            onCornersChange={onCornersChange}
            onFontStyleChange={onFontStyleChange}
          />
        </div>
      </div>
    </div>
  );
};
