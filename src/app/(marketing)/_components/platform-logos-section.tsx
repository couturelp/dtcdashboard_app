const PLATFORMS = [
  { name: 'Shopify', color: '#96BF48' },
  { name: 'Meta Ads', color: '#0081FB' },
  { name: 'Google Ads', color: '#4285F4' },
  { name: 'Google Analytics', color: '#E37400' },
] as const;

export function PlatformLogosSection() {
  return (
    <section className="py-16 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-brand-muted uppercase tracking-wide mb-10">
          Integrates with the platforms you already use
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
          {PLATFORMS.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: platform.color }}
              >
                {platform.name.charAt(0)}
              </div>
              <span className="text-base font-semibold text-brand-heading">{platform.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
