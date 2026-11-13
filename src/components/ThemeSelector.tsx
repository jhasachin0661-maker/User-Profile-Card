import React from 'react';
import { ThemeType, CornerRadius, FontStyle } from '../types/profile';
import { Palette, Square, Type } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: ThemeType;
  currentCorners: CornerRadius;
  currentFontStyle: FontStyle;
  onThemeChange: (theme: ThemeType) => void;
  onCornersChange: (corners: CornerRadius) => void;
  onFontStyleChange: (fontStyle: FontStyle) => void;
}

const THEMES: { id: ThemeType; name: string; bg: string; text: string; accent: string; border: string }[] = [
  {
    id: 'obsidian',
    name: 'Obsidian',
    bg: '#17251F',
    text: '#F2EBDD',
    accent: '#B99A6A',
    border: '#2A3C33',
  },
  {
    id: 'ivory',
    name: 'Warm Ivory',
    bg: '#F2EBDD',
    text: '#202622',
    accent: '#17251F',
    border: '#DCD4C4',
  },
  {
    id: 'charcoal',
    name: 'Charcoal',
    bg: '#1A1D20',
    text: '#E8ECEF',
    accent: '#B99A6A',
    border: '#2F343B',
  },
  {
    id: 'sand',
    name: 'Dune Sand',
    bg: '#EFECE6',
    text: '#2C2623',
    accent: '#A86542',
    border: '#D8D2C6',
  },
];

const CORNERS: { id: CornerRadius; label: string; previewClass: string }[] = [
  { id: 'sharp', label: 'Sharp (0px)', previewClass: 'rounded-none' },
  { id: 'subtle', label: 'Subtle (12px)', previewClass: 'rounded-md' },
  { id: 'rounded', label: 'Curved (24px)', previewClass: 'rounded-2xl' },
];

const FONTS: { id: FontStyle; label: string; previewFont: string }[] = [
  { id: 'serif', label: 'Editorial Serif', previewFont: 'font-serif' },
  { id: 'sans', label: 'Modern Sans', previewFont: 'font-sans' },
  { id: 'mixed', label: 'Mixed Hybrid', previewFont: 'font-serif' },
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  currentCorners,
  currentFontStyle,
  onThemeChange,
  onCornersChange,
  onFontStyleChange,
}) => {
  return (
    <div className="space-y-5">
      {/* Theme selection */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted mb-2.5">
          <Palette className="w-3.5 h-3.5 text-brass" /> Color Theme
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onThemeChange(theme.id)}
                className={`group relative flex flex-col items-start p-2.5 rounded-lg border text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-brass bg-brass/5 ring-1 ring-brass shadow-sm'
                    : 'border-[#DDD6C8] bg-white/70 hover:border-brass/60 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5 w-full mb-2">
                  <div
                    className="w-5 h-5 rounded-full border border-black/10 shadow-sm flex items-center justify-center"
                    style={{ backgroundColor: theme.bg }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
                  </div>
                  <div className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: theme.accent }} />
                  <div className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: theme.text }} />
                </div>
                <span className="text-xs font-semibold text-ink group-hover:text-obsidian">
                  {theme.name}
                </span>
                <span className="text-[10px] text-muted capitalize">
                  {theme.id === 'obsidian' || theme.id === 'charcoal' ? 'Dark scheme' : 'Light scheme'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Typography and Corner Radius Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {/* Corner Radius */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            <Square className="w-3.5 h-3.5 text-brass" /> Card Corner Radius
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {CORNERS.map((corner) => {
              const isSelected = currentCorners === corner.id;
              return (
                <button
                  key={corner.id}
                  type="button"
                  onClick={() => onCornersChange(corner.id)}
                  className={`py-1.5 px-2 text-[11px] font-medium border text-center transition-all ${corner.previewClass} ${
                    isSelected
                      ? 'border-brass bg-brass/10 text-obsidian font-semibold'
                      : 'border-[#DDD6C8] bg-white/60 text-muted hover:border-brass/40 hover:text-ink'
                  }`}
                >
                  {corner.label.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Style */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            <Type className="w-3.5 h-3.5 text-brass" /> Typography Style
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {FONTS.map((font) => {
              const isSelected = currentFontStyle === font.id;
              return (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => onFontStyleChange(font.id)}
                  className={`py-1.5 px-2 text-[11px] font-medium border rounded-md text-center transition-all ${
                    isSelected
                      ? 'border-brass bg-brass/10 text-obsidian font-semibold'
                      : 'border-[#DDD6C8] bg-white/60 text-muted hover:border-brass/40 hover:text-ink'
                  }`}
                >
                  <span className={font.previewFont}>{font.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
