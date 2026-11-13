import React from 'react';
import { TemplateType } from '../types/profile';
import { Layout, Check, Sparkles, UserCheck, Layers } from 'lucide-react';

interface TemplateSelectorProps {
  currentTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

const TEMPLATES: {
  id: TemplateType;
  title: string;
  tag: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'editorial',
    title: 'Editorial',
    tag: 'Signature',
    description: 'Asymmetric layout with oversized editorial serif titles, brass accent bar, and architectural layout.',
    icon: Sparkles,
  },
  {
    id: 'classic',
    title: 'Classic',
    tag: 'Balanced',
    description: 'Timeless centered profile card with refined circular avatar ring, clean divider, and badge pill grid.',
    icon: UserCheck,
  },
  {
    id: 'compact',
    title: 'Compact',
    tag: 'Badge',
    description: 'Dense, horizontal executive badge format ideal for fast scanning and clean digital networking.',
    icon: Layers,
  },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplate,
  onTemplateChange,
}) => {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted mb-2.5">
        <Layout className="w-3.5 h-3.5 text-brass" /> Card Template Architecture
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {TEMPLATES.map((tmpl) => {
          const isSelected = currentTemplate === tmpl.id;
          const Icon = tmpl.icon;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onTemplateChange(tmpl.id)}
              className={`group relative p-3.5 rounded-lg border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-brass bg-brass/10 ring-1 ring-brass shadow-sm'
                  : 'border-[#DDD6C8] bg-white/70 hover:border-brass/60 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md ${isSelected ? 'bg-brass text-obsidian' : 'bg-[#EAE4D7] text-ink'}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-semibold text-ink group-hover:text-obsidian">
                      {tmpl.title}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-brass text-obsidian flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed text-muted line-clamp-2">
                  {tmpl.description}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider uppercase text-brass font-medium">
                  {tmpl.tag}
                </span>
                <span className="text-[10px] text-muted group-hover:text-ink font-medium">
                  {isSelected ? 'Active layout' : 'Select layout'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

