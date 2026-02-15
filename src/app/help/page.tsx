import Link from 'next/link';
import { getCategoriesWithCounts } from '@/lib/help';

export default function HelpCenterPage() {
  const categories = getCategoriesWithCounts();

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-heading tracking-tight">
            Help Center
          </h1>
          <p className="mt-4 text-lg text-brand-body">
            Find answers to common questions, setup guides, and troubleshooting tips.
          </p>
        </div>

        {/* Category cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/help/${cat.slug}`}
              className="group rounded-xl border border-gray-100 bg-white p-6 hover:shadow-lg hover:shadow-gray-100/50 transition-shadow"
            >
              <span className="text-3xl">{cat.icon}</span>
              <h2 className="mt-4 text-lg font-bold text-brand-heading group-hover:text-brand-primary transition-colors">
                {cat.name}
              </h2>
              <p className="mt-2 text-sm text-brand-body leading-relaxed">{cat.description}</p>
              <p className="mt-3 text-xs text-brand-muted">
                {cat.articleCount} {cat.articleCount === 1 ? 'article' : 'articles'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
