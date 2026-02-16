import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { getAllArticles as getAllHelpArticles } from '@/lib/help';

const BASE_URL = 'https://dtcdashboard.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const marketingPages = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/features', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/pricing', changeFrequency: 'monthly' as const, priority: 0.9 },
    // NOTE: /integrations page not yet implemented — add back when built

    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/help', changeFrequency: 'weekly' as const, priority: 0.6 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  // Dynamic blog article URLs
  const posts = getAllPosts();
  const blogPages = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic help article URLs
  const helpArticles = getAllHelpArticles();
  const helpPages = helpArticles.map((article) => ({
    path: `/help/${article.category}/${article.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...marketingPages, ...blogPages, ...helpPages].map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
