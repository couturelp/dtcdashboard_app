import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary-light via-white to-brand-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-heading tracking-tight leading-[1.1]">
            Stop guessing.
            <br />
            <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              See your real profit.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-brand-body max-w-2xl mx-auto leading-relaxed">
            DTC Dashboard connects your Shopify store and ad accounts, factors in every cost, and
            shows you exactly where your money goes. Revenue is vanity. Profit is sanity.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/app/register"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-brand-primary text-white text-base font-semibold hover:bg-brand-primary-hover transition-colors shadow-lg shadow-brand-primary/25"
            >
              Start Free
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-gray-200 text-brand-heading text-base font-semibold hover:border-brand-primary hover:text-brand-primary transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Dashboard preview placeholder — replaced with screenshot later */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="rounded-xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/50 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-gray-400">dtcdashboard.com/app</span>
            </div>
            <div className="p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white min-h-[280px] lg:min-h-[360px] flex items-center justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
                {/* Mock KPI cards */}
                {[
                  { label: 'Revenue', value: '$48,230' },
                  { label: 'Net Profit', value: '$12,847' },
                  { label: 'Margin', value: '26.6%' },
                ].map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-lg border border-gray-200 bg-white p-4 text-center"
                  >
                    <p className="text-xs text-brand-muted uppercase tracking-wide">{kpi.label}</p>
                    <p className="mt-1 text-xl font-bold text-brand-heading font-mono tabular-nums">
                      {kpi.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
