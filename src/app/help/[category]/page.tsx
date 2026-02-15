import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HELP_CATEGORIES, getCategoryBySlug, getArticlesByCategory } from '@/lib/help';
import { HelpSidebar } from '../_components/help-sidebar';

// -- Static params for build-time generation ------------------

export async function generateStaticParams() {
  return HELP_CATEGORIES.map((cat) => ({ category: cat.slug }));
}

// -- Dynamic metadata -----------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};

  return {
    title: `${cat.name} - Help Center`,
    description: cat.description,
  };
}

// -- Page component -------------------------------------------

export default async function HelpCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) notFound();

  const articles = getArticlesByCategory(category);

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-brand-muted mb-8">
          <Link href="/help" className="hover:text-brand-primary transition-colors">
            Help Center
          </Link>
          <span>/</span>
          <span className="text-brand-heading font-medium">{cat.name}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[250px_1fr] lg:gap-12">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <HelpSidebar activeCategory={category} />
            </div>
          </aside>

          {/* Main content */}
          <div>
            <div className="mb-8">
              <span className="text-3xl">{cat.icon}</span>
              <h1 className="mt-3 text-3xl font-extrabold text-brand-heading">{cat.name}</h1>
              <p className="mt-2 text-brand-body">{cat.description}</p>
            </div>

            {/* Article list */}
            {articles.length > 0 ? (
              <div className="space-y-3">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/help/${category}/${article.slug}`}
                    className="block rounded-lg border border-gray-100 bg-white p-5 hover:shadow-md hover:shadow-gray-100/50 transition-shadow group"
                  >
                    <h2 className="text-base font-semibold text-brand-heading group-hover:text-brand-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="mt-1 text-sm text-brand-body line-clamp-2">
                      {article.description}
                    </p>
                    <p className="mt-2 text-xs text-brand-muted">{article.readTime}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-brand-muted">No articles in this category yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
