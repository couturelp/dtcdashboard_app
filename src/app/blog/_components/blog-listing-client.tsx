'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog';

interface BlogListingClientProps {
  posts: BlogPostMeta[];
  categories: string[];
}

const POSTS_PER_PAGE = 12;

export function BlogListingClient({ posts, categories }: BlogListingClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  // Separate featured post (first featured post, or first post overall)
  const featuredPost = filtered.find((p) => p.featured) || filtered[0] || null;
  const remainingPosts = featuredPost
    ? filtered.filter((p) => p.slug !== featuredPost.slug)
    : [];

  // Pagination: only show first page for now (pagination pages added when >12 articles exist)
  const visiblePosts = remainingPosts.slice(0, POSTS_PER_PAGE);

  return (
    <>
      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === null
              ? 'bg-brand-primary text-white'
              : 'bg-brand-surface text-brand-body hover:bg-brand-primary-light'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-brand-primary text-white'
                : 'bg-brand-surface text-brand-body hover:bg-brand-primary-light'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured article (larger card) */}
      {featuredPost && (
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="block mb-12 group"
        >
          <article className="rounded-xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg hover:shadow-gray-100/50 transition-shadow md:grid md:grid-cols-2 md:gap-0">
            {/* Image placeholder */}
            <div className="bg-gradient-to-br from-brand-primary-light to-brand-surface-alt h-48 md:h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-brand-primary/20">
                {featuredPost.title.charAt(0)}
              </span>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 text-sm text-brand-muted mb-3">
                <span className="px-2 py-0.5 rounded bg-brand-primary-light text-brand-primary text-xs font-medium">
                  {featuredPost.category}
                </span>
                <span>{featuredPost.date}</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-brand-heading group-hover:text-brand-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="mt-3 text-brand-body leading-relaxed line-clamp-3">
                {featuredPost.description}
              </p>
            </div>
          </article>
        </Link>
      )}

      {/* Article card grid */}
      {visiblePosts.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="h-full rounded-xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg hover:shadow-gray-100/50 transition-shadow flex flex-col">
                {/* Image placeholder */}
                <div className="bg-gradient-to-br from-brand-primary-light to-brand-surface-alt h-40 flex items-center justify-center">
                  <span className="text-3xl font-bold text-brand-primary/20">
                    {post.title.charAt(0)}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-sm text-brand-muted mb-3">
                    <span className="px-2 py-0.5 rounded bg-brand-primary-light text-brand-primary text-xs font-medium">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-heading group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-body leading-relaxed line-clamp-3 flex-1">
                    {post.description}
                  </p>
                  <p className="mt-4 text-xs text-brand-muted">{post.date}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-brand-muted text-lg">No articles found in this category.</p>
        </div>
      )}
    </>
  );
}
