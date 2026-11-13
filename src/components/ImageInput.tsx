import React, { useState, useEffect, useRef } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  User,
  RefreshCw,
  Trash2,
  Link as LinkIcon,
  FolderOpen
} from 'lucide-react';

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
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value.trim()) {
      setImageStatus('idle');
      return;
    }

    setImageStatus('loading');
    const img = new Image();
    img.src = value;
    img.onload = () => {
      setImageStatus('loaded');
      setUploadError(null);
    };
    img.onerror = () => {
      setImageStatus('error');
    };
  }, [value]);

  const getInitials = (fullName: string) => {
    if (!fullName.trim()) return 'ID';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Process and downscale uploaded image file
  const handleFile = (file: File) => {
    setUploadError(null);

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image size exceeds 10MB. Please choose a smaller image.');
      return;
    }

    setImageStatus('loading');

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        // Downscale to max 800px on longest side for optimal speed and LocalStorage safety
        const maxDim = 800;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          onChange(result);
          setImageStatus('loaded');
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
        onChange(compressedDataUrl);
        setImageStatus('loaded');
      };
      img.onerror = () => {
        setImageStatus('error');
        setUploadError('Could not process this image file.');
      };
      img.src = result;
    };
    reader.onerror = () => {
      setImageStatus('error');
      setUploadError('Failed to read the file.');
    };
    reader.readAsDataURL(file);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // reset input so same file can be re-selected if desired
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemoveImage = () => {
    onChange('');
    setUploadError(null);
    setImageStatus('idle');
  };

  const isUploadedLocal = value.startsWith('data:image/');

  return (
    <div className="space-y-2.5">
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileInputChange}
        className="hidden"
        id="profile-photo-upload"
      />

      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
          Profile Photo <span className="text-muted/60 font-normal lowercase">(gallery / folder upload)</span>
        </label>
        {imageStatus === 'loaded' && (
          <span className="flex items-center text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Ready
          </span>
        )}
        {imageStatus === 'error' && (
          <span className="flex items-center text-xs text-amber-700 font-medium">
            <AlertCircle className="w-3.5 h-3.5 mr-1" /> Unreadable (initials fallback active)
          </span>
        )}
      </div>

      {/* Main Upload Box / Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 ${
          isDragging
            ? 'border-brass bg-brass/10 scale-[1.01]'
            : 'border-[#DDD6C8] bg-white/60 hover:bg-white hover:border-brass/70'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Avatar Preview */}
          <div className="relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-brass/50 bg-[#EFECE4] flex items-center justify-center text-obsidian shadow-sm">
            {imageStatus === 'loaded' ? (
              <img
                src={value}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
                onError={() => setImageStatus('error')}
              />
            ) : imageStatus === 'loading' ? (
              <RefreshCw className="w-6 h-6 text-brass animate-spin" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-obsidian text-ivory font-serif font-bold text-base">
                {name ? getInitials(name) : <User className="w-6 h-6 text-brass/80" />}
              </div>
            )}
          </div>

          {/* Action buttons and info */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-obsidian hover:bg-obsidian-light text-ivory text-xs font-semibold shadow-xs transition-colors"
              >
                <FolderOpen className="w-4 h-4 text-brass" />
                <span>{value ? 'Change Photo' : 'Upload from Device / Gallery'}</span>
              </button>

              {value && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium transition-colors"
                  title="Remove uploaded image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-muted mt-2">
              Drag & drop or browse from gallery/file explorer.
              {isUploadedLocal && <span className="text-emerald-700 font-medium ml-1">✓ Local file attached</span>}
            </p>
          </div>
        </div>
      </div>

      {/* Alternative: URL input toggle if needed */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-muted hover:text-obsidian flex items-center gap-1 font-medium underline decoration-dotted"
        >
          <LinkIcon className="w-3 h-3 text-brass" />
          <span>{showUrlInput ? 'Hide image URL link' : 'Or paste an image web link instead'}</span>
        </button>
      </div>

      {showUrlInput && (
        <div className="pt-1">
          <input
            type="url"
            value={isUploadedLocal ? '' : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste direct image link: https://..."
            className="w-full px-3 py-2 text-xs bg-white border border-[#DDD6C8] rounded-md shadow-xs focus:border-brass focus:outline-none"
          />
        </div>
      )}

      {/* Error displays */}
      {(uploadError || error) && (
        <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          <span>{uploadError || error}</span>
        </p>
      )}
    </div>
  );
};
