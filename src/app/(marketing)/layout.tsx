export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <span className="font-bold text-xl">DTC Dashboard</span>
          {/* Navigation links will be added in design system task */}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-4 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} DTC Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
