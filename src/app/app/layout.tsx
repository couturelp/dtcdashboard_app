import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-gray-50 p-4">
        <div className="font-bold text-lg mb-6">DTC Dashboard</div>
        <nav className="space-y-2">
          <Link href="/app" className="block px-3 py-2 rounded hover:bg-gray-100">
            Overview
          </Link>
          <Link href="/app/marketing" className="block px-3 py-2 rounded hover:bg-gray-100">
            Marketing
          </Link>
          <Link href="/app/costs" className="block px-3 py-2 rounded hover:bg-gray-100">
            Costs
          </Link>
          <Link href="/app/export" className="block px-3 py-2 rounded hover:bg-gray-100">
            Export
          </Link>
          <Link href="/app/settings" className="block px-3 py-2 rounded hover:bg-gray-100">
            Settings
          </Link>
        </nav>
        {/* Auth guard will be added in auth task */}
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
