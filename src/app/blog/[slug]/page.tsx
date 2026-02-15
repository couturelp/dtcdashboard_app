import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import GithubSlugger from 'github-slugger';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog';
import { ShareButtons } from '../_components/share-buttons';

// -- Static params for build-time generation ------------------

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// -- Dynamic metadata -----------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://dtcdashboard.com/blog/${slug}`,
      siteName: 'DTC Dashboard',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// -- Heading extraction for TOC -------------------------------

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(mdxContent: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  const slugger = new GithubSlugger();
  let match;

  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const level = match[1].length; // 2 for ##, 3 for ###
    const text = match[2].trim();
    const id = slugger.slug(text);
    headings.push({ id, text, level });
  }

  return headings;
}

// -- Page component -------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { content: mdxContent } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      },
    },
  });

  const headings = extractHeadings(post.content);
  const relatedPosts = getRelatedPosts(slug, post.category, 3);

  // Article schema JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DTC Dashboard',
      url: 'https://dtcdashboard.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dtcdashboard.com/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article header */}
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-3 text-sm text-brand-muted mb-4">
              <span className="px-2.5 py-1 rounded bg-brand-primary-light text-brand-primary text-xs font-medium">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-heading tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-brand-body">{post.description}</p>
          </header>

          {/* Content + TOC layout */}
          <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
            {/* Main content */}
            <div className="max-w-3xl mx-auto lg:mx-0">
              {/* Prose-styled MDX content */}
              <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-brand-heading prose-p:text-brand-body prose-p:leading-relaxed prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-heading prose-li:text-brand-body">
                {mdxContent}
              </div>

              {/* Author bio */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
                    <span className="text-white font-bold text-sm">DTC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-heading">
                      {post.author}
                    </p>
                    <p className="text-sm text-brand-muted">
                      Writing about ecommerce profitability, marketing analytics,
                      and the metrics that matter for DTC brands.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social share */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm font-semibold text-brand-heading mb-4">
                  Share this article
                </p>
                <ShareButtons title={post.title} slug={slug} />
              </div>

              {/* CTA banner */}
              <div className="mt-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent p-8 text-center">
                <h3 className="text-xl font-bold text-white">
                  Ready to see your real profit?
                </h3>
                <p className="mt-2 text-white/80 text-sm">
                  Connect your Shopify store and ad accounts. See exactly where
                  your money goes.
                </p>
                <Link
                  href="/app/register"
                  className="mt-6 inline-flex items-center px-6 py-3 rounded-lg bg-white text-brand-primary font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Start Free Today
                </Link>
              </div>
            </div>

            {/* Table of contents sidebar (desktop only) */}
            {headings.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted mb-4">
                    On this page
                  </p>
                  <nav className="space-y-2">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`block text-sm transition-colors hover:text-brand-primary ${
                          h.level === 3
                            ? 'pl-4 text-brand-muted'
                            : 'text-brand-body font-medium'
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>

          {/* Related articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-200 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-brand-heading mb-8">
                Related Articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group"
                  >
                    <article className="rounded-xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg hover:shadow-gray-100/50 transition-shadow">
                      <div className="bg-gradient-to-br from-brand-primary-light to-brand-surface-alt h-32 flex items-center justify-center">
                        <span className="text-2xl font-bold text-brand-primary/20">
                          {rp.title.charAt(0)}
                        </span>
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-brand-muted mb-2">
                          {rp.readTime}
                        </p>
                        <h3 className="text-base font-bold text-brand-heading group-hover:text-brand-primary transition-colors">
                          {rp.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
