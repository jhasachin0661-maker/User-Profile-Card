import React from 'react';
import { Shield, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="privacy" className="border-t border-[#DDD6C8] bg-[#EFECE4] py-12 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#DDD6C8]">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-obsidian text-ivory flex items-center justify-center font-serif font-black text-sm border border-brass/40">
                I
              </div>
              <span className="font-serif font-bold text-sm tracking-tight text-obsidian">
                IDENTITY STUDIO
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              An editorial digital card creator crafted for professionals, developers, creators, and students.
              Engineered with Obsidian Editorial design aesthetics.
            </p>
          </div>

          {/* Column 2: Privacy Guarantee */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-obsidian">
              <Shield className="w-4 h-4 text-emerald-700" />
              <span>Strict Privacy Guarantee</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              This application is 100% client-side. We do not operate a backend server, database, or analytics tracker.
              Your data stays in browser memory and your local machine.
            </p>
          </div>

          {/* Column 3: Architecture & Tech Stack */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-obsidian">
              <Code2 className="w-4 h-4 text-brass" />
              <span>Engineering Architecture</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded bg-white/70 border border-[#DDD6C8] text-obsidian">
                React 18 + TS
              </span>
              <span className="px-2 py-0.5 rounded bg-white/70 border border-[#DDD6C8] text-obsidian">
                Vite 6
              </span>
              <span className="px-2 py-0.5 rounded bg-white/70 border border-[#DDD6C8] text-obsidian">
                Tailwind CSS
              </span>
              <span className="px-2 py-0.5 rounded bg-white/70 border border-[#DDD6C8] text-obsidian">
                html-to-image
              </span>
              <span className="px-2 py-0.5 rounded bg-white/70 border border-[#DDD6C8] text-obsidian">
                LocalStorage
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-2">
          <p>© 2026 Identity Studio. Built with intentional craftsmanship and zero telemetry.</p>
          <p className="flex items-center gap-1">
            <span>Obsidian Editorial Design System</span>
            <span>•</span>
            <span className="text-obsidian font-medium">Antigravity Certified</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
