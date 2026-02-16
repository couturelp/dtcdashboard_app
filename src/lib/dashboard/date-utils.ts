// src/lib/dashboard/date-utils.ts

export type DatePreset =
  | 'today'
  | 'yesterday'
  | 'last_7_days'
  | 'last_30_days'
  | 'this_month'
  | 'last_month'
  | 'this_quarter'
  | 'this_year'
  | 'custom';

export type CompareOption = 'previous_period' | 'same_period_last_year' | 'none';

export interface DateRange {
  from: string; // ISO date string YYYY-MM-DD
  to: string; // ISO date string YYYY-MM-DD
}

export interface DateRangeWithComparison {
  current: DateRange;
  comparison: DateRange | null;
  preset: DatePreset;
  compareOption: CompareOption;
}

export const PRESET_LABELS: Record<DatePreset, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  last_7_days: 'Last 7 Days',
  last_30_days: 'Last 30 Days',
  this_month: 'This Month',
  last_month: 'Last Month',
  this_quarter: 'This Quarter',
  this_year: 'This Year',
  custom: 'Custom',
};

/**
 * Calculate the date range for a given preset relative to `now`.
 * All dates are in YYYY-MM-DD format (timezone-agnostic for URL params).
 */
export function getPresetRange(preset: DatePreset, now: Date = new Date()): DateRange {
  const today = formatDate(now);
  const yesterday = formatDate(addDays(now, -1));

  switch (preset) {
    case 'today':
      return { from: today, to: today };
    case 'yesterday':
      return { from: yesterday, to: yesterday };
    case 'last_7_days':
      return { from: formatDate(addDays(now, -6)), to: today };
    case 'last_30_days':
      return { from: formatDate(addDays(now, -29)), to: today };
    case 'this_month': {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return { from: formatDate(start), to: today };
    }
    case 'last_month': {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return { from: formatDate(start), to: formatDate(end) };
    }
    case 'this_quarter': {
      const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
      return { from: formatDate(quarterStart), to: today };
    }
    case 'this_year': {
      const yearStart = new Date(now.getFullYear(), 0, 1);
      return { from: formatDate(yearStart), to: today };
    }
    case 'custom':
    default:
      // Default to last 30 days for custom (caller should override)
      return { from: formatDate(addDays(now, -29)), to: today };
  }
}

/**
 * Calculate the comparison period for a given date range.
 */
export function getComparisonRange(current: DateRange, option: CompareOption): DateRange | null {
  if (option === 'none') return null;

  const fromDate = new Date(current.from + 'T00:00:00');
  const toDate = new Date(current.to + 'T00:00:00');
  const durationMs = toDate.getTime() - fromDate.getTime();
  const durationDays = Math.round(durationMs / (1000 * 60 * 60 * 24));

  if (option === 'previous_period') {
    const compEnd = addDays(fromDate, -1);
    const compStart = addDays(compEnd, -durationDays);
    return { from: formatDate(compStart), to: formatDate(compEnd) };
  }

  if (option === 'same_period_last_year') {
    const compFrom = shiftYearSafe(fromDate, -1);
    const compTo = shiftYearSafe(toDate, -1);
    return { from: formatDate(compFrom), to: formatDate(compTo) };
  }

  return null;
}

/**
 * Parse date range from URL search params.
 * Falls back to 'last_30_days' if params are missing/invalid.
 */
export function parseDateRangeFromParams(params: URLSearchParams): DateRangeWithComparison {
  const from = params.get('from');
  const to = params.get('to');
  const preset = (params.get('preset') as DatePreset) || 'last_30_days';
  const compare = (params.get('compare') as CompareOption) || 'none';

  let current: DateRange;

  if (from && to && isValidDate(from) && isValidDate(to)) {
    // Swap if end is before start
    current = from <= to ? { from, to } : { from: to, to: from };
  } else {
    current = getPresetRange(preset);
  }

  const comparison = getComparisonRange(current, compare);

  return { current, comparison, preset, compareOption: compare };
}

/**
 * Build URL search params from date range state.
 */
export function buildDateRangeParams(
  range: DateRange,
  preset: DatePreset,
  compare: CompareOption
): URLSearchParams {
  const params = new URLSearchParams();
  params.set('from', range.from);
  params.set('to', range.to);
  params.set('preset', preset);
  if (compare !== 'none') {
    params.set('compare', compare);
  }
  return params;
}

// --- Helpers ---

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Shift a date by `delta` years, clamping to the last day of the month
 * when the target month has fewer days (e.g., Feb 29 → Feb 28 in non-leap years).
 */
function shiftYearSafe(date: Date, delta: number): Date {
  const result = new Date(date);
  const targetYear = result.getFullYear() + delta;
  result.setFullYear(targetYear);
  // If the month overflowed (e.g., Feb 29 → Mar 1), clamp to last day of intended month
  if (result.getMonth() !== date.getMonth()) {
    result.setDate(0); // sets to last day of the previous month
  }
  return result;
}

function isValidDate(str: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(str) && !isNaN(new Date(str + 'T00:00:00').getTime());
}
