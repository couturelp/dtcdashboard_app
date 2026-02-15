'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/admin', label: 'Customers', exact: true },
  { href: '/admin/billing', label: 'Billing' },
  { href: '/admin/audit-log', label: 'Audit Log' },
  { href: '/admin/system', label: 'System' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  function isActive(item: typeof NAV_ITEMS[number]) {
    if (item.exact) {
      return pathname === item.href || pathname.startsWith('/admin/customer');
    }
    return pathname.startsWith(item.href);
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-gray-900 text-white p-4 flex-shrink-0">
        <div className="font-bold text-lg mb-6">Admin Panel</div>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded text-sm ${
                isActive(item)
                  ? 'bg-gray-700 text-white font-medium'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
