// src/app/app/marketing/_components/platform-breakdown.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PlatformData {
  platform: string;
  platform_label: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  conversion_value: number;
  roas: number;
  cpa: number;
  spend_percentage: number;
  has_data: boolean;
}

interface PlatformsResponse {
  platforms: PlatformData[];
  currency: string;
}

export function PlatformBreakdown() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<PlatformsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/marketing/platforms?${searchParams.toString()}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error(
            (await res.json().catch(() => ({}))).error || `HTTP ${res.status}`
          );
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
    new Intl.NumberFormat('en-US').format(Math.round(v));

  if (error) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        Unable to load platform data: {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
        <div className="h-4 w-40 bg-gray-200 rounded mb-4" />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    );
  }

  const platforms = data?.platforms ?? [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">
          Platform Breakdown
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Platform
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
                Spend
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
                % of Total
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
                Impressions
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
                Clicks
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
                CTR
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
                Conversions
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
                Revenue
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
                ROAS
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
                CPA
              </th>
            </tr>
          </thead>
          <tbody>
            {platforms.map((p) => (
              <tr
                key={p.platform}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          p.platform === 'meta' ? '#1877F2' : '#4285F4',
                      }}
                    />
                    <span className="font-medium text-gray-900">
                      {p.platform_label}
                    </span>
                    {!p.has_data && (
                      <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        Not connected
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-gray-900 font-medium">
                  {fmtCur(p.spend)}
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {p.spend_percentage.toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {fmtNum(p.impressions)}
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {fmtNum(p.clicks)}
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {p.ctr.toFixed(2)}%
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {fmtNum(p.conversions)}
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {fmtCur(p.conversion_value)}
                </td>
                <td className="px-4 py-3 text-right text-gray-900 font-medium">
                  {p.roas.toFixed(2)}x
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {fmtCur(p.cpa)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {platforms.every((p) => !p.has_data) && (
        <div className="px-6 py-8 text-center text-sm text-gray-500">
          No ad platform data available. Connect your Meta Ads or Google Ads
          through Fivetran to see performance data.
        </div>
      )}
    </div>
  );
}
