// src/app/app/_components/date-range-picker.tsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import {
  type DatePreset,
  type CompareOption,
  PRESET_LABELS,
  getPresetRange,
  parseDateRangeFromParams,
  buildDateRangeParams,
} from '@/lib/dashboard/date-utils';

export function DateRangePicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dateRange = parseDateRangeFromParams(searchParams);
  const [showCustom, setShowCustom] = useState(dateRange.preset === 'custom');

  const updateUrl = useCallback(
    (from: string, to: string, preset: DatePreset, compare: CompareOption) => {
      const params = buildDateRangeParams({ from, to }, preset, compare);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname]
  );

  function handlePresetClick(preset: DatePreset) {
    if (preset === 'custom') {
      setShowCustom(true);
      return;
    }
    setShowCustom(false);
    const range = getPresetRange(preset);
    updateUrl(range.from, range.to, preset, dateRange.compareOption);
  }

  function handleCustomChange(field: 'from' | 'to', value: string) {
    const current = { ...dateRange.current, [field]: value };
    updateUrl(current.from, current.to, 'custom', dateRange.compareOption);
  }

  function handleCompareChange(option: CompareOption) {
    updateUrl(dateRange.current.from, dateRange.current.to, dateRange.preset, option);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {/* Preset buttons */}
        {(Object.keys(PRESET_LABELS) as DatePreset[]).map((preset) => (
          <button
            key={preset}
            onClick={() => handlePresetClick(preset)}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
              ${
                dateRange.preset === preset
                  ? 'bg-brand-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            {PRESET_LABELS[preset]}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {/* Custom date inputs */}
        {showCustom && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateRange.current.from}
              onChange={(e) => handleCustomChange('from', e.target.value)}
              className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg"
            />
            <span className="text-gray-400 text-xs">to</span>
            <input
              type="date"
              value={dateRange.current.to}
              onChange={(e) => handleCustomChange('to', e.target.value)}
              className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg"
            />
          </div>
        )}

        {/* Compare toggle */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500">Compare:</label>
          <select
            value={dateRange.compareOption}
            onChange={(e) => handleCompareChange(e.target.value as CompareOption)}
            className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
          >
            <option value="none">Off</option>
            <option value="previous_period">Previous Period</option>
            <option value="same_period_last_year">Same Period Last Year</option>
          </select>
        </div>
      </div>
    </div>
  );
}
