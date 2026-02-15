const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Profit Analytics Dashboard',
    description: 'See revenue, COGS, shipping, fees, ad spend, and net profit in one view. Track gross, contribution, and net profit with period-over-period comparison.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    ),
    title: 'Marketing Analytics',
    description: 'Campaign-level performance across Meta Ads and Google Ads. ROAS, CPC, CPM, CTR, and CPA at a glance with drill-down to ad set and ad level data.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: 'Cost Management',
    description: 'Upload your COGS via CSV or enter them manually. Configure shipping rates, track operating expenses, and manage custom cost categories.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.556a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
      </svg>
    ),
    title: 'Automated Data Sync',
    description: 'Connect Shopify, Meta Ads, Google Ads, and Google Analytics through Fivetran. Your data syncs automatically so your numbers are always current.',
  },
];
// NOTE: Do NOT use `as const` here — the `icon` fields contain JSX elements
// which are not literal types and will cause a TypeScript error with `as const`.

export function FeatureHighlightsSection() {
  return (
    <section className="py-20 lg:py-28 bg-brand-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-brand-primary uppercase tracking-wide mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-heading">
            Everything you need to track real profitability
          </h2>
          <p className="mt-4 text-lg text-brand-body">
            From revenue to net profit, every number in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl bg-white border border-gray-100 p-8 hover:shadow-lg hover:shadow-gray-100/50 transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-primary-light text-brand-primary flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold text-brand-heading">{feature.title}</h3>
              <p className="mt-3 text-brand-body leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
