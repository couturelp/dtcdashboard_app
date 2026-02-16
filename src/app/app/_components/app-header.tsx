// src/app/app/_components/app-header.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function AppHeader() {
  const router = useRouter();
  const [storeName, setStoreName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/store/settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.name) setStoreName(data.name);
      })
      .catch(() => {});
  }, []);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [menuOpen]);

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Proceed to login regardless
    }
    router.push('/app/login');
  }

  return (
    <header className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
      <div>
        <h2 className="text-sm font-medium text-gray-500">
          {storeName || 'Store Dashboard'}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        {/* Data freshness badge — placeholder until Fivetran sync status integration */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          Data sync status pending
        </span>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            Account
            <svg
              className={`w-3.5 h-3.5 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
              <Link
                href="/app/settings"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
