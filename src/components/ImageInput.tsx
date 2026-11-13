import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, AlertCircle, CheckCircle2, User, RefreshCw } from 'lucide-react';

interface ImageInputProps {
  value: string;
  name: string;
  error?: string;
  onChange: (value: string) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  value,
  name,
  error,
  onChange,
}) => {
  const [imageStatus, setImageStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');

  useEffect(() => {
    if (!value.trim()) {
      setImageStatus('idle');
      return;
    }

    setImageStatus('loading');
    const img = new Image();
    img.src = value;
    img.onload = () => setImageStatus('loaded');
    img.onerror = () => setImageStatus('error');
  }, [value]);

  const getInitials = (fullName: string) => {
    if (!fullName.trim()) return 'ID';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor="imageUrl" className="block text-xs font-semibold uppercase tracking-wider text-muted">
          Avatar Image URL <span className="text-muted/60 font-normal lowercase">(optional)</span>
        </label>
        {imageStatus === 'loaded' && (
          <span className="flex items-center text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Valid image
          </span>
        )}
        {imageStatus === 'error' && (
          <span className="flex items-center text-xs text-amber-700 font-medium">
            <AlertCircle className="w-3.5 h-3.5 mr-1" /> Image unavailable (fallback shown)
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Visual Mini Avatar Preview / Fallback */}
        <div className="relative flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border border-brass/40 bg-ivory-dark flex items-center justify-center text-obsidian shadow-sm">
          {imageStatus === 'loaded' ? (
            <img
              src={value}
              alt="Avatar preview"
              className="w-full h-full object-cover"
              onError={() => setImageStatus('error')}
            />
          ) : imageStatus === 'loading' ? (
            <RefreshCw className="w-5 h-5 text-brass animate-spin" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-obsidian text-ivory font-serif font-bold text-sm">
              {name ? getInitials(name) : <User className="w-5 h-5 text-brass/80" />}
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
            <ImageIcon className="w-4 h-4" />
          </div>
          <input
            id="imageUrl"
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className={`w-full pl-9 pr-3 py-2 text-sm bg-white/80 border rounded-md shadow-sm transition-colors focus:bg-white focus:outline-none ${
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-[#D9D2C5] focus:border-brass focus:ring-1 focus:ring-brass'
            }`}
          />
        </div>
      </div>

      {error ? (
        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      ) : (
        <p className="text-[11px] text-muted">
          Supports direct image links (HTTPS/HTTP). Falls back gracefully to your initials if empty or blocked.
        </p>
      )}
    </div>
  );
};
