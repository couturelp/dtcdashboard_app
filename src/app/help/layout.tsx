import Link from 'next/link';

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">
            DTC Dashboard
          </Link>
          <Link href="/help" className="text-sm font-medium">
            Help Center
          </Link>
        </nav>
      </header>
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">{children}</main>
    </div>
  );
}
