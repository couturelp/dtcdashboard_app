import type { ReactNode } from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip';
  children: ReactNode;
}

const CALLOUT_STYLES = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: '\u2139\uFE0F',
    title: 'Info',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: '\u26A0\uFE0F',
    title: 'Warning',
  },
  tip: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: '\uD83D\uDCA1',
    title: 'Tip',
  },
} as const;

export function Callout({ type = 'info', children }: CalloutProps) {
  const style = CALLOUT_STYLES[type];

  return (
    <div className={`my-6 rounded-lg border ${style.border} ${style.bg} p-4`}>
      <div className="flex items-start gap-3">
        <span className="text-lg leading-none mt-0.5">{style.icon}</span>
        <div className="text-sm leading-relaxed text-brand-heading [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}
