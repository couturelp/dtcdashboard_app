import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

// -- Types ----------------------------------------------------

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date string: "2026-02-15"
  author: string;
  category: string;
  tags: string[];
  featuredImage: string; // path relative to /public, e.g. "/blog/images/article.jpg"
  featured: boolean; // if true, shown as hero card on listing page
  readTime: string; // e.g. "5 min read"
}

export interface BlogPost extends BlogPostMeta {
  content: string; // raw MDX content (without frontmatter)
}

// -- Constants ------------------------------------------------

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// -- Public API -----------------------------------------------

/**
 * Get metadata for all published blog posts, sorted by date (newest first).
 */
export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      return getPostMeta(slug);
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Get a single post by slug, including raw MDX content.
 * Returns null if the file doesn't exist.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
    author: data.author || 'DTC Dashboard Team',
    category: data.category || 'General',
    tags: Array.isArray(data.tags) ? data.tags : [],
    featuredImage: data.featuredImage || '',
    featured: Boolean(data.featured),
    readTime: `${Math.ceil(stats.minutes)} min read`,
    content,
  };
}

/**
 * Get all unique categories from published posts.
 */
export function getCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories).sort();
}

/**
 * Get related posts: same category, excluding the current post, max `limit` results.
 */
export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

// -- Internal -------------------------------------------------

function getPostMeta(slug: string): BlogPostMeta | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
    author: data.author || 'DTC Dashboard Team',
    category: data.category || 'General',
    tags: Array.isArray(data.tags) ? data.tags : [],
    featuredImage: data.featuredImage || '',
    featured: Boolean(data.featured),
    readTime: `${Math.ceil(stats.minutes)} min read`,
  };
}
