const PAIN_POINTS = [
  {
    icon: '📊',
    title: 'Revenue looks great, but where did the money go?',
    description:
      'Shopify shows revenue, not profit. Without factoring in COGS, shipping, transaction fees, and ad spend, you are flying blind.',
  },
  {
    icon: '🔀',
    title: 'Data scattered across five different platforms',
    description:
      'Your Shopify admin, Meta Ads manager, Google Ads dashboard, and spreadsheets all tell a different story. None of them show the full picture.',
  },
  {
    icon: '⏳',
    title: 'Hours wasted on manual spreadsheets every week',
    description:
      'Pulling exports, copying numbers, building formulas that break. You started a brand to build products, not pivot tables.',
  },
] as const;

export function ProblemSolutionSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-brand-primary uppercase tracking-wide mb-3">
            The problem
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-heading">
            Most DTC brands have no idea if they are actually profitable
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PAIN_POINTS.map((point) => (
            <div
              key={point.title}
              className="rounded-xl border border-gray-100 bg-brand-surface p-8"
            >
              <span className="text-3xl">{point.icon}</span>
              <h3 className="mt-4 text-lg font-bold text-brand-heading">{point.title}</h3>
              <p className="mt-3 text-sm text-brand-body leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-brand-accent uppercase tracking-wide mb-3">
            The solution
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-heading">
            One dashboard. Every cost. Real profit.
          </h2>
          <p className="mt-4 text-lg text-brand-body">
            DTC Dashboard pulls your Shopify orders, ad spend from Meta and Google, and combines
            them with your product costs, shipping, and expenses to show you the numbers that
            actually matter.
          </p>
        </div>
      </div>
    </section>
  );
}
