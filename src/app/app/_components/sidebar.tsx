// src/app/app/_components/sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: string; // Emoji placeholder — will be replaced with proper icons in design system task
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/app', icon: '📊' },
  { label: 'Marketing', href: '/app/marketing', icon: '📈' },
  { label: 'Costs', href: '/app/costs', icon: '💰' },
  { label: 'Export', href: '/app/export', icon: '📥' },
  { label: 'Settings', href: '/app/settings', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === '/app') return pathname === '/app';
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md border border-gray-200"
        aria-label="Toggle navigation"
        aria-expanded={mobileOpen}
      >
        <span className="block w-5 h-0.5 bg-gray-700 mb-1" />
        <span className="block w-5 h-0.5 bg-gray-700 mb-1" />
        <span className="block w-5 h-0.5 bg-gray-700" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-40 top-0 left-0 h-full w-64
          bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="p-5 border-b border-gray-100">
          <Link href="/app" className="text-lg font-bold text-gray-900">
            DTC Dashboard
          </Link>
        </div>

        <nav className="p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-150
                ${
                  isActive(item.href)
                    ? 'bg-brand-primary-light text-brand-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
