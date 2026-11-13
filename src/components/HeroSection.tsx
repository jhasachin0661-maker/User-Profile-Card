import React from 'react';
import { ArrowDown, Sparkles, Zap, Download, Palette } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToEditor = () => {
    const el = document.getElementById('editor-workspace');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#DDD6C8] overflow-hidden bg-gradient-to-b from-[#FAF8F3] to-ivory">
      {/* Decorative architectural background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#e5decb_1px,transparent_1px),linear-gradient(to_bottom,#e5decb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Editorial Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brass/40 bg-brass/10 mb-6 text-obsidian shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-brass" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider">
            Obsidian Editorial Edition • 10 Curated Themes
          </span>
        </div>

        {/* Oversized Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-obsidian leading-[1.08] max-w-4xl mx-auto">
          Create your identity. <br className="hidden sm:inline" />
          <span className="italic font-normal text-ink/85">Design your presence.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed font-normal">
          Transform your personal and professional profile into an exquisite, customizable digital card.
          Choose your layout, upload your photo, customize typography, and export high-resolution PNGs.
        </p>

        {/* CTA */}
        <div className="mt-9 flex items-center justify-center">
          <button
            type="button"
            onClick={scrollToEditor}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-obsidian hover:bg-obsidian-light text-ivory font-semibold text-sm transition-all shadow-md hover:shadow-xl group"
          >
            <span>Start Designing Now</span>
            <ArrowDown className="w-4 h-4 text-brass group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Three Value Pillars */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto text-left">
          <div className="p-4 rounded-xl border border-[#DDD6C8] bg-white/50 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-obsidian font-serif font-bold text-sm mb-1">
              <Zap className="w-4 h-4 text-brass" />
              <span>Real-Time Preview</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Every keystroke and photo upload updates instantly on your choice of 3 architectural layouts.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#DDD6C8] bg-white/50 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-obsidian font-serif font-bold text-sm mb-1">
              <Palette className="w-4 h-4 text-brass" />
              <span>10 Color Themes</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Explore 10 bespoke color palettes ranging from Obsidian & Warm Ivory to Midnight Royal and Wine Bordeaux.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#DDD6C8] bg-white/50 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-obsidian font-serif font-bold text-sm mb-1">
              <Download className="w-4 h-4 text-brass" />
              <span>Retina 2x Export</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Export ultra-crisp 2x PNG images ready for social avatars, email signatures, portfolio cards, and print.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
