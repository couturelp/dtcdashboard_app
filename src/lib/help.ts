import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

// -- Types ----------------------------------------------------

export interface HelpCategory {
  slug: string;
  name: string;
  description: string;
  icon: string; // emoji icon for category cards
  order: number; // display order on home page
}

export interface HelpArticleMeta {
  slug: string;
  category: string; // category slug, e.g. "getting-started"
  title: string;
  description: string;
  order: number; // display order within category (1, 2, 3...)
  lastUpdated: string; // ISO date string: "2026-02-15"
  readTime: string; // e.g. "3 min read"
}

export interface HelpArticle extends HelpArticleMeta {
  content: string; // raw MDX content (without frontmatter)
}

// -- Category Configuration -----------------------------------

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    slug: 'getting-started',
    name: 'Getting Started',
    description: 'Account setup, first steps, and connecting your data sources.',
    icon: '🚀',
    order: 1,
  },
  {
    slug: 'dashboard-analytics',
    name: 'Dashboard & Analytics',
    description: 'Understanding metrics, date ranges, P&L, and charts.',
    icon: '📊',
    order: 2,
  },
  {
    slug: 'marketing-analytics',
    name: 'Marketing Analytics',
    description: 'Ad platform data, campaigns, ROAS, and marketing KPIs.',
    icon: '📈',
    order: 3,
  },
  {
    slug: 'cost-management',
    name: 'Cost Management',
    description: 'COGS upload, shipping rates, and expense tracking.',
    icon: '💰',
    order: 4,
  },
  {
    slug: 'integrations',
    name: 'Integrations',
    description: 'Fivetran setup, Shopify connection, and ad platform connections.',
    icon: '🔗',
    order: 5,
  },
  {
    slug: 'billing-account',
    name: 'Billing & Account',
    description: 'Subscription plans, payments, and account settings.',
    icon: '💳',
    order: 6,
  },
  {
    slug: 'troubleshooting',
    name: 'Troubleshooting',
    description: 'Common issues, data sync problems, and frequently asked questions.',
    icon: '🔧',
    order: 7,
  },
];

// -- Constants ------------------------------------------------

const HELP_DIR = path.join(process.cwd(), 'content', 'help');

// -- Public API -----------------------------------------------

/**
 * Get a category config by slug. Returns undefined if not found.
 */
export function getCategoryBySlug(slug: string): HelpCategory | undefined {
  return HELP_CATEGORIES.find((c) => c.slug === slug);
}

/**
 * Get all categories with their article counts.
 */
export function getCategoriesWithCounts(): (HelpCategory & { articleCount: number })[] {
  return HELP_CATEGORIES.map((cat) => ({
    ...cat,
    articleCount: getArticlesByCategory(cat.slug).length,
  }));
}

/**
 * Get all help articles across all categories, sorted by category order then article order.
 */
export function getAllArticles(): HelpArticleMeta[] {
  const articles: HelpArticleMeta[] = [];

  for (const category of HELP_CATEGORIES) {
    articles.push(...getArticlesByCategory(category.slug));
  }

  return articles;
}

/**
 * Get all articles in a specific category, sorted by order field.
 */
export function getArticlesByCategory(categorySlug: string): HelpArticleMeta[] {
  const categoryDir = path.join(HELP_DIR, categorySlug);
  if (!fs.existsSync(categoryDir)) return [];

  const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.mdx'));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      return getArticleMeta(categorySlug, slug);
    })
    .filter((a): a is HelpArticleMeta => a !== null)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get a single article by category and slug, including raw MDX content.
 */
export function getArticleBySlug(categorySlug: string, slug: string): HelpArticle | null {
  const filePath = path.join(HELP_DIR, categorySlug, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    category: categorySlug,
    title: data.title || '',
    description: data.description || '',
    order: typeof data.order === 'number' ? data.order : 99,
    lastUpdated: data.lastUpdated ? new Date(data.lastUpdated).toISOString().split('T')[0] : '',
    readTime: `${Math.ceil(stats.minutes)} min read`,
    content,
  };
}

/**
 * Get the previous and next articles within the same category (for prev/next navigation).
 * Returns { prev: HelpArticleMeta | null, next: HelpArticleMeta | null }.
 */
export function getAdjacentArticles(
  categorySlug: string,
  currentSlug: string
): { prev: HelpArticleMeta | null; next: HelpArticleMeta | null } {
  const articles = getArticlesByCategory(categorySlug);
  const currentIndex = articles.findIndex((a) => a.slug === currentSlug);

  if (currentIndex === -1) return { prev: null, next: null };

  return {
    prev: currentIndex > 0 ? articles[currentIndex - 1] : null,
    next: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
  };
}

// -- Internal -------------------------------------------------

function getArticleMeta(categorySlug: string, slug: string): HelpArticleMeta | null {
  const filePath = path.join(HELP_DIR, categorySlug, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    category: categorySlug,
    title: data.title || '',
    description: data.description || '',
    order: typeof data.order === 'number' ? data.order : 99,
    lastUpdated: data.lastUpdated ? new Date(data.lastUpdated).toISOString().split('T')[0] : '',
    readTime: `${Math.ceil(stats.minutes)} min read`,
  };
}
