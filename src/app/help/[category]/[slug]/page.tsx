import GithubSlugger from 'github-slugger';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import {
  getArticleBySlug,
  getAdjacentArticles,
  getAllArticles,
  getCategoryBySlug,
} from '@/lib/help';
import { Callout } from '../../_components/callout';
import { HelpFeedback } from '../../_components/help-feedback';
import { HelpSidebar } from '../../_components/help-sidebar';

// -- Custom MDX components map --------------------------------

const mdxComponents = {
  Callout,
};

// -- Static params for build-time generation ------------------

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({
    category: a.category,
    slug: a.slug,
  }));
}

// -- Dynamic metadata -----------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: `${article.title} | DTC Dashboard Help`,
      description: article.description,
      url: `https://dtcdashboard.com/help/${category}/${slug}`,
      siteName: 'DTC Dashboard',
      type: 'article',
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
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugger.slug(text);
    headings.push({ id, text, level });
  }

  return headings;
}

// -- Page component -------------------------------------------

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);

  if (!article) notFound();

  const cat = getCategoryBySlug(category);
  const { prev, next } = getAdjacentArticles(category, slug);
  const headings = extractHeadings(article.content);

  const { content: mdxContent } = await compileMDX({
    source: article.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      },
    },
  });

  // Determine schema type: articles with numbered lists get HowTo, others get Article
  const hasNumberedSteps = /^\d+\.\s/m.test(article.content);

  const schemaJsonLd = hasNumberedSteps
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: article.title,
        description: article.description,
        dateModified: article.lastUpdated,
        publisher: {
          '@type': 'Organization',
          name: 'DTC Dashboard',
          url: 'https://dtcdashboard.com',
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        dateModified: article.lastUpdated,
        publisher: {
          '@type': 'Organization',
          name: 'DTC Dashboard',
          url: 'https://dtcdashboard.com',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://dtcdashboard.com/help/${category}/${slug}`,
        },
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-brand-muted mb-8">
            <Link href="/help" className="hover:text-brand-primary transition-colors">
              Help Center
            </Link>
            <span>/</span>
            <Link href={`/help/${category}`} className="hover:text-brand-primary transition-colors">
              {cat?.name ?? category}
            </Link>
            <span>/</span>
            <span className="text-brand-heading font-medium truncate max-w-[200px]">
              {article.title}
            </span>
          </nav>

          <div className="lg:grid lg:grid-cols-[250px_1fr_200px] lg:gap-10">
            {/* Left sidebar: categories */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <HelpSidebar activeCategory={category} />
              </div>
            </aside>

            {/* Main content */}
            <div>
              {/* Article header */}
              <header className="mb-8">
                <div className="flex items-center gap-3 text-sm text-brand-muted mb-3">
                  <span className="px-2.5 py-1 rounded bg-brand-primary-light text-brand-primary text-xs font-medium">
                    {cat?.name ?? category}
                  </span>
                  {article.lastUpdated && <span>Updated {article.lastUpdated}</span>}
                  <span>{article.readTime}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-heading tracking-tight">
                  {article.title}
                </h1>
              </header>

              {/* Prose-styled MDX content */}
              <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-brand-heading prose-p:text-brand-body prose-p:leading-relaxed prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-heading prose-li:text-brand-body prose-ol:text-brand-body prose-code:text-brand-primary prose-code:bg-brand-primary-light prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none">
                {mdxContent}
              </div>

              {/* Was this helpful? */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <HelpFeedback articleId={`${category}/${slug}`} />
              </div>

              {/* Prev / Next navigation */}
              <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-2 gap-4">
                {prev ? (
                  <Link
                    href={`/help/${category}/${prev.slug}`}
                    className="group rounded-lg border border-gray-100 p-4 hover:border-brand-primary transition-colors"
                  >
                    <p className="text-xs text-brand-muted mb-1">Previous</p>
                    <p className="text-sm font-semibold text-brand-heading group-hover:text-brand-primary transition-colors">
                      {prev.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link
                    href={`/help/${category}/${next.slug}`}
                    className="group rounded-lg border border-gray-100 p-4 hover:border-brand-primary transition-colors text-right"
                  >
                    <p className="text-xs text-brand-muted mb-1">Next</p>
                    <p className="text-sm font-semibold text-brand-heading group-hover:text-brand-primary transition-colors">
                      {next.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>

            {/* Right sidebar: Table of Contents */}
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
                          h.level === 3 ? 'pl-3 text-brand-muted' : 'text-brand-body font-medium'
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
        </div>
      </section>
    </>
  );
}
