// src/app/app/marketing/_components/marketing-kpi-summary.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { KpiCard } from '../../_components/kpi-card';

interface MarketingSummaryResponse {
  current: Record<string, number>;
  changes: Record<string, number> | null;
  currency: string;
}

export function MarketingKpiSummary() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<MarketingSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/marketing/summary?${searchParams.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error((await res.json().catch(() => ({}))).error || `HTTP ${res.status}`);
        }
        setData(await res.json());
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [searchParams]);

  const fmtCur = (v: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data?.currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(v);
  const fmtNum = (v: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(v);
  const fmtDec = (v: number) => v.toFixed(2);

  if (error) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        Unable to load marketing summary: {error}
      </div>
    );
  }

  const kpis: {
    label: string;
    key: string;
    fmt: (v: number) => string;
    suffix?: string;
    tooltip?: string;
  }[] = [
    { label: 'Total Ad Spend', key: 'total_ad_spend', fmt: fmtCur },
    { label: 'Conversions', key: 'total_conversions', fmt: fmtNum },
    {
      label: 'ROAS',
      key: 'roas',
      fmt: (v) => `${fmtDec(v)}x`,
      tooltip: 'Revenue generated for every dollar spent on ads',
    },
    {
      label: 'CPA',
      key: 'cpa',
      fmt: fmtCur,
      tooltip: 'Cost to acquire one customer through ads',
    },
    {
      label: 'CTR',
      key: 'ctr',
      fmt: fmtDec,
      suffix: '%',
      tooltip: 'Percentage of people who clicked your ad after seeing it',
    },
    {
      label: 'CPM',
      key: 'cpm',
      fmt: fmtCur,
      tooltip: 'Cost for every 1,000 times your ad was shown',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi) => (
        <KpiCard
          key={kpi.label}
          label={kpi.label}
          value={loading ? '' : kpi.fmt(data!.current[kpi.key])}
          change={data?.changes?.[kpi.key] ?? null}
          suffix={kpi.suffix}
          loading={loading}
        />
      ))}
    </div>
  );
}
