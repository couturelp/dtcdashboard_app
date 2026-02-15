// src/app/app/_components/app-header.tsx

export function AppHeader() {
  return (
    <header className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
      <div>
        <h2 className="text-sm font-medium text-gray-500">Store Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        {/* Data freshness badge — placeholder until Part 03, Task 6 */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          Data sync status pending
        </span>
      </div>
    </header>
  );
}
