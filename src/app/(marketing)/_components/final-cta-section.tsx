import Link from 'next/link';

export function FinalCtaSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-brand-primary to-brand-accent">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Your revenue means nothing if you do not know your profit
        </h2>
        <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto">
          Join hundreds of DTC brands that stopped guessing and started growing with real profit
          data. Set up in minutes, not days.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/app/register"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-brand-primary text-base font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            Start Free
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-white/30 text-white text-base font-semibold hover:bg-white/10 transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
