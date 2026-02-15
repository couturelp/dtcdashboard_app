import Link from 'next/link';

const FOOTER_LINKS = {
  Product: [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/integrations', label: 'Integrations' },
  ],
  Company: [
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  Resources: [
    { href: '/help', label: 'Help Center' },
  ],
  Legal: [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
} as const;

export function MarketingFooter() {
  return (
    <footer className="bg-brand-heading text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-bold text-lg">DTC Dashboard</span>
            </div>
            <p className="text-sm text-gray-400">
              Profit analytics for ecommerce operators and DTC brands.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} DTC Dashboard. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
