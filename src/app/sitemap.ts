import type { MetadataRoute } from 'next';

const BASE_URL = 'https://dtcdashboard.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const marketingPages = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/features', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/pricing', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/integrations', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/help', changeFrequency: 'weekly' as const, priority: 0.6 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return marketingPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
