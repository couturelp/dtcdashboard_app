// src/app/app/layout.tsx
import { AppHeader } from './_components/app-header';
import { Sidebar } from './_components/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50/50">
      <Sidebar />
      <div className="flex-1">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-6 pb-6">
          <AppHeader />
          {children}
        </main>
      </div>
    </div>
  );
}
