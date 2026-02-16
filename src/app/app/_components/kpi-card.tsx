// src/app/app/_components/kpi-card.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

interface KpiCardProps {
  label: string;
  value: string;
  change: number | null; // percentage change, null if no comparison
  prefix?: string; // e.g., "$"
  suffix?: string; // e.g., "%"
  loading?: boolean;
  invertChange?: boolean; // true for metrics where lower is better (CPA, CPM)
  tooltip?: string; // plain-language definition shown on hover/focus
}

export function KpiCard({ label, value, change, prefix, suffix, loading, invertChange, tooltip }: KpiCardProps) {
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
  // For metrics where lower is better (CPA, CPM), invert the color coding
  const isGood = invertChange ? isNegative : isPositive;
  const isBad = invertChange ? isPositive : isNegative;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-1 mb-1">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        {tooltip && <TooltipIcon text={tooltip} />}
      </div>
      <p className="text-2xl font-bold text-gray-900 font-mono tabular-nums">
        {prefix}
        {value}
        {suffix}
      </p>
      {change !== null && (
        <div className="flex items-center gap-1 mt-2">
          <span
            className={`text-xs font-medium ${
              isGood ? 'text-emerald-600' : isBad ? 'text-red-600' : 'text-gray-500'
            }`}
          >
            {isPositive ? '\u25B2' : isNegative ? '\u25BC' : '\u2014'} {Math.abs(change).toFixed(1)}
            %
          </span>
          <span className="text-xs text-gray-400">vs prior period</span>
        </div>
      )}
    </div>
  );
}

/** Small info icon with hover/focus tooltip for KPI definitions. */
function TooltipIcon({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  }
  function hide() {
    timeoutRef.current = setTimeout(() => setVisible(false), 150);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        type="button"
        onFocus={show}
        onBlur={hide}
        aria-label="More info"
        className="text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-3.5 h-3.5"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="8" y="11.5" textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor">i</text>
        </svg>
      </button>
      {visible && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-lg z-50 pointer-events-none"
        >
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </span>
      )}
    </span>
  );
}
