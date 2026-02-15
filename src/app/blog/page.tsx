import { getAllPosts, getCategories } from '@/lib/blog';
import { BlogListingClient } from './_components/blog-listing-client';

export default function BlogListingPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-heading tracking-tight">
            Blog
          </h1>
          <p className="mt-4 text-lg text-brand-body">
            Insights on ecommerce profitability, marketing analytics, and growing your DTC brand.
          </p>
        </div>

        {/* Client component handles category filter + card grid */}
        <BlogListingClient posts={posts} categories={categories} />
      </div>
    </section>
  );
}
