// src/app/app/_components/kpi-summary.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { KpiCard } from './kpi-card';

interface SummaryResponse {
  current: Record<string, number>;
  changes: Record<string, number> | null;
  currency: string;
}

export function KpiSummary() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/dashboard/summary?${searchParams.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok)
          throw new Error((await res.json().catch(() => ({}))).error || `HTTP ${res.status}`);
        setData(await res.json());
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [searchParams]);

  const fmtCur = (v: number) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: data?.currency || 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(v);
    } catch {
      // Fallback if currency code is invalid (e.g., malformed store data)
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(v);
    }
  };
  const fmtNum = (v: number) => new Intl.NumberFormat('en-US').format(v);

  if (error)
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        Unable to load summary: {error}
      </div>
    );

  // Define 6 KPI cards: label, formatter, key, optional suffix
  const kpis: { label: string; key: string; fmt: (v: number) => string; suffix?: string }[] = [
    { label: 'Total Revenue', key: 'total_revenue', fmt: fmtCur },
    { label: 'Total Orders', key: 'total_orders', fmt: fmtNum },
    { label: 'Avg Order Value', key: 'average_order_value', fmt: fmtCur },
    { label: 'Gross Profit', key: 'gross_profit', fmt: fmtCur },
    { label: 'Net Profit', key: 'net_profit', fmt: fmtCur },
    { label: 'Profit Margin', key: 'profit_margin', fmt: (v) => v.toFixed(1), suffix: '%' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpis.map((kpi) => (
        <KpiCard
          key={kpi.label}
          label={kpi.label}
          value={loading ? '' : kpi.fmt(data?.current[kpi.key] ?? 0)}
          change={data?.changes?.[kpi.key] ?? null}
          suffix={kpi.suffix}
          loading={loading}
        />
      ))}
    </div>
  );
}
