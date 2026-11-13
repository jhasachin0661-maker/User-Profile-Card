import React from 'react';
import { Sparkles, Shield } from 'lucide-react';

interface NavbarProps {
  onLoadSample: () => void;
  storageActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoadSample, storageActive }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#DDD6C8] bg-ivory/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-obsidian text-ivory flex items-center justify-center font-serif font-black text-lg shadow-sm border border-brass/40">
            I
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-obsidian">
                IDENTITY STUDIO
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-brass/15 text-obsidian font-semibold border border-brass/30">
                v1.0
              </span>
            </div>
            <span className="text-[10px] text-muted tracking-wide -mt-0.5 hidden sm:block">
              Client-Side Profile Card Generator
            </span>
          </div>
        </div>

        {/* Navigation links & Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-muted">
            <a href="#editor-workspace" className="hover:text-obsidian transition-colors">
              Editor
            </a>
            <a href="#editor-workspace" className="hover:text-obsidian transition-colors">
              Palettes
            </a>
            <a href="#privacy" className="hover:text-obsidian transition-colors">
              Privacy
            </a>
          </nav>

          <div className="h-4 w-[1px] bg-[#DDD6C8] hidden md:block" />

          {/* Draft indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-muted font-mono">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>{storageActive ? 'Local Draft Active' : 'Ephemeral Mode'}</span>
          </div>

          {/* Quick sample button */}
          <button
            type="button"
            onClick={onLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brass/50 bg-brass/10 hover:bg-brass/20 text-obsidian text-xs font-semibold transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-brass" />
            <span className="hidden xs:inline">Sample</span>
          </button>
        </div>
      </div>
    </header>
  );
};
