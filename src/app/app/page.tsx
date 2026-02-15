// src/app/app/page.tsx
import { Suspense } from 'react';
import { DateRangePicker } from './_components/date-range-picker';
import { KpiSummary } from './_components/kpi-summary';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      <Suspense fallback={<div className="h-10 bg-gray-100 rounded-lg animate-pulse mb-6" />}>
        <DateRangePicker />
      </Suspense>

      <Suspense
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
                <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
                <div className="h-7 w-28 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        }
      >
        <KpiSummary />
      </Suspense>
    </div>
  );
}
