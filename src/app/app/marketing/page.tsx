// src/app/app/marketing/page.tsx
import { Suspense } from 'react';
import { DateRangePicker } from '../_components/date-range-picker';
import { MarketingKpiSummary } from './_components/marketing-kpi-summary';
import { PlatformBreakdown } from './_components/platform-breakdown';

export default function MarketingAnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Marketing Analytics</h1>

      <Suspense fallback={<div className="h-10 bg-gray-100 rounded-lg animate-pulse mb-6" />}>
        <DateRangePicker />
      </Suspense>

      <Suspense
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
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
        <div className="mb-6">
          <MarketingKpiSummary />
        </div>
      </Suspense>

      <Suspense
        fallback={
          <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            <div className="h-4 w-40 bg-gray-200 rounded mb-4" />
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        }
      >
        <PlatformBreakdown />
      </Suspense>
    </div>
  );
}
