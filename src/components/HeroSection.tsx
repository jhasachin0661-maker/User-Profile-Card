import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Zap, Download } from 'lucide-react';

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
            Obsidian Editorial Edition • 100% Client-Side
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
          Zero accounts, zero backend processing, 100% privacy-first in your browser.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={scrollToEditor}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-obsidian hover:bg-obsidian-light text-ivory font-semibold text-sm transition-all shadow-md hover:shadow-xl group"
          >
            <span>Start Designing Now</span>
            <ArrowDown className="w-4 h-4 text-brass group-hover:translate-y-0.5 transition-transform" />
          </button>

          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#D5CDBC] bg-white/70 hover:bg-white text-ink font-medium text-sm transition-colors shadow-xs"
          >
            Explore Specifications
          </a>
        </div>

        {/* Three Value Pillars */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto text-left">
          <div className="p-4 rounded-xl border border-[#DDD6C8] bg-white/50 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-obsidian font-serif font-bold text-sm mb-1">
              <Zap className="w-4 h-4 text-brass" />
              <span>Real-Time Preview</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Every keystroke formats instantly onto your choice of 3 architectural layouts and 4 color schemes.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#DDD6C8] bg-white/50 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-obsidian font-serif font-bold text-sm mb-1">
              <ShieldCheck className="w-4 h-4 text-brass" />
              <span>Zero-Backend Privacy</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              No servers, no tracking cookies, and no database. Your personal info never leaves your local memory.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#DDD6C8] bg-white/50 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-obsidian font-serif font-bold text-sm mb-1">
              <Download className="w-4 h-4 text-brass" />
              <span>Retina 2x Export</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Export ultra-crisp PNG images ready for social avatars, email signatures, resume attachments, and print.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
