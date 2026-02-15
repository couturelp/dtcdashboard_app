import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-gray-900 text-white p-4">
        <div className="font-bold text-lg mb-6">Admin Panel</div>
        <nav className="space-y-2">
          <Link href="/admin" className="block px-3 py-2 rounded hover:bg-gray-800">
            Customers
          </Link>
          <Link href="/admin/billing" className="block px-3 py-2 rounded hover:bg-gray-800">
            Billing
          </Link>
          <Link href="/admin/audit-log" className="block px-3 py-2 rounded hover:bg-gray-800">
            Audit Log
          </Link>
          <Link href="/admin/system" className="block px-3 py-2 rounded hover:bg-gray-800">
            System
          </Link>
        </nav>
        {/* Admin auth guard will be added in auth task */}
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
