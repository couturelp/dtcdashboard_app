// src/app/app/_components/kpi-card.tsx

interface KpiCardProps {
  label: string;
  value: string;
  change: number | null; // percentage change, null if no comparison
  prefix?: string; // e.g., "$"
  suffix?: string; // e.g., "%"
  loading?: boolean;
}

export function KpiCard({ label, value, change, prefix, suffix, loading }: KpiCardProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
        <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
        <div className="h-7 w-28 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
    );
  }

  const isPositive = change !== null && change > 0;
  const isNegative = change !== null && change < 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold text-gray-900">
        {prefix}
        {value}
        {suffix}
      </p>
      {change !== null && (
        <div className="flex items-center gap-1 mt-2">
          <span
            className={`text-xs font-medium ${
              isPositive
                ? 'text-emerald-600'
                : isNegative
                  ? 'text-red-600'
                  : 'text-gray-500'
            }`}
          >
            {isPositive ? '\u25B2' : isNegative ? '\u25BC' : '\u2014'}
            {' '}
            {Math.abs(change).toFixed(1)}%
          </span>
          <span className="text-xs text-gray-400">vs prior period</span>
        </div>
      )}
    </div>
  );
}
