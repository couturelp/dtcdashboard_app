import Link from 'next/link';
import { HELP_CATEGORIES, getArticlesByCategory } from '@/lib/help';

interface HelpSidebarProps {
  activeCategory?: string; // current category slug
}

export function HelpSidebar({ activeCategory }: HelpSidebarProps) {
  return (
    <nav className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted mb-3 px-3">
        Categories
      </p>
      {HELP_CATEGORIES.map((cat) => {
        const isActive = cat.slug === activeCategory;
        const articleCount = getArticlesByCategory(cat.slug).length;

        return (
          <Link
            key={cat.slug}
            href={`/help/${cat.slug}`}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive
                ? 'bg-brand-primary-light text-brand-primary font-medium'
                : 'text-brand-body hover:bg-gray-50 hover:text-brand-heading'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </span>
            <span className="text-xs text-brand-muted">{articleCount}</span>
          </Link>
        );
      })}
    </nav>
  );
}
