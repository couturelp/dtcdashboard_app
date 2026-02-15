const STEPS = [
  {
    number: '1',
    title: 'Connect your platforms',
    description:
      'Link your Shopify store, Meta Ads, and Google Ads through Fivetran. It takes under five minutes and requires zero technical knowledge.',
  },
  {
    number: '2',
    title: 'Upload your costs',
    description:
      'Add your product costs via CSV or manual entry. Set your shipping rates and operating expenses. We handle the calculations.',
  },
  {
    number: '3',
    title: 'See your real profit',
    description:
      'Your dashboard lights up with real-time P&L, marketing ROAS, and net profit numbers. Updated automatically as your data syncs.',
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-brand-primary uppercase tracking-wide mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-heading">
            From signup to profit clarity in three steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
                <span className="text-xl font-bold text-white">{step.number}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-brand-heading">{step.title}</h3>
              <p className="mt-3 text-brand-body leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
