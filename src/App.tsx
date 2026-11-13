import React, { useState, useEffect, useCallback } from 'react';
import { useProfile } from './hooks/useProfile';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProfileForm } from './components/ProfileForm';
import { LivePreview } from './components/LivePreview';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { ToastMessage, ThemeType, TemplateType, CornerRadius, FontStyle } from './types/profile';
import { Layers, Palette, ShieldCheck, Check } from 'lucide-react';

export const App: React.FC = () => {
  const {
    profile,
    appearance,
    errors,
    storageActive,
    isDraftRestored,
    updateField,
    updateAppearance,
    loadSample,
    resetForm,
    toggleStorage,
  } = useProfile();

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addNotification = useCallback(
    (type: 'success' | 'error' | 'info', title: string, description?: string) => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
      setToasts((prev) => [...prev, { id, type, title, description }]);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Show notice on mount if draft was recovered from LocalStorage
  useEffect(() => {
    if (isDraftRestored) {
      addNotification('info', 'Draft Restored', 'Loaded your saved profile configuration from local browser storage.');
    }
  }, [isDraftRestored, addNotification]);

  const handleLoadSample = () => {
    loadSample();
    addNotification('success', 'Sample Profile Loaded', 'Prefilled with Alex Morgan design technologist profile.');
  };

  const handleReset = () => {
    resetForm();
    addNotification('info', 'Form Reset', 'All profile fields and configurations cleared.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-ink selection:bg-brass/25 selection:text-obsidian font-sans">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Navigation Header */}
      <Navbar onLoadSample={handleLoadSample} storageActive={storageActive} />

      {/* Hero Section */}
      <HeroSection />

      {/* Editor Workspace */}
      <main id="editor-workspace" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass font-semibold">
            <span className="w-2 h-2 rounded-full bg-brass" />
            <span>Interactive Studio Canvas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-obsidian tracking-tight mt-1">
            Build & Customize Your Profile Card
          </h2>
          <p className="text-sm text-muted mt-1 max-w-2xl">
            Input your information on the left; your profile renders live on the right. Switch layouts, color
            palettes, and export your crisp 2x PNG at any time.
          </p>
        </div>

        {/* Two-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form (5 cols on large screens) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ProfileForm
              profile={profile}
              errors={errors}
              storageActive={storageActive}
              onUpdateField={updateField}
              onLoadSample={handleLoadSample}
              onReset={handleReset}
              onToggleStorage={toggleStorage}
            />
          </div>

          {/* Right Column: Live Preview & Customizer (7 cols on large screens) */}
          <div className="lg:col-span-7 order-1 lg:order-2 lg:sticky lg:top-24">
            <LivePreview
              profile={profile}
              appearance={appearance}
              onThemeChange={(theme: ThemeType) => updateAppearance({ theme })}
              onTemplateChange={(template: TemplateType) => updateAppearance({ template })}
              onCornersChange={(corners: CornerRadius) => updateAppearance({ corners })}
              onFontStyleChange={(fontStyle: FontStyle) => updateAppearance({ fontStyle })}
              onNotification={addNotification}
            />
          </div>
        </div>

        {/* Specifications & Acceptance Verification Matrix */}
        <section id="features" className="mt-20 pt-16 border-t border-[#DDD6C8]">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-brass font-semibold">
              Specification Matrix
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-obsidian tracking-tight mt-1">
              Engineered Strictly to PRD & TRD Criteria
            </h3>
            <p className="text-sm text-muted mt-2">
              Every acceptance requirement verified client-side without any server dependencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 p-5 rounded-xl border border-[#DDD6C8] shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-brass" />
                <h4 className="font-serif font-bold text-obsidian text-sm">3 Distinct Templates</h4>
              </div>
              <ul className="space-y-2 text-xs text-muted">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span><strong>Editorial:</strong> Asymmetric signature typography & accent bar</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span><strong>Classic:</strong> Symmetrical centered circular portrait</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span><strong>Compact:</strong> Streamlined executive badge format</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/60 p-5 rounded-xl border border-[#DDD6C8] shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-brass" />
                <h4 className="font-serif font-bold text-obsidian text-sm">4 Obsidian Themes</h4>
              </div>
              <ul className="space-y-2 text-xs text-muted">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span><strong>Obsidian:</strong> #17251F dark green with ivory & brass</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span><strong>Warm Ivory:</strong> #F2EBDD cream with ink & obsidian</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span><strong>Charcoal:</strong> #1A1D20 slate with silver text</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span><strong>Dune Sand:</strong> #EFECE6 desert sand with sepia</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/60 p-5 rounded-xl border border-[#DDD6C8] shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-brass" />
                <h4 className="font-serif font-bold text-obsidian text-sm">Privacy & Quality of Life</h4>
              </div>
              <ul className="space-y-2 text-xs text-muted">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Zero telemetry, no backend, zero analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Automatic image fallback with initials</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Optional LocalStorage draft persistence</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>High-resolution 2x PNG rendering</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
