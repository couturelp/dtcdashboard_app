'use client';

import { useEffect, useState } from 'react';

interface BillingStatus {
  tier: string;
  planName: string;
  subscription: {
    status: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    price: number | null;
    currency: string | null;
    interval: 'month' | 'year' | null;
    paymentMethodLast4: string | null;
    paymentMethodBrand: string | null;
  } | null;
  usage?: {
    dataSourcesUsed: number;
    dataSourcesMax: number; // -1 = unlimited
  };
}

type LoadingState = 'loading' | 'loaded' | 'error';

// What each tier upgrade unlocks (shown as value proposition)
const UPGRADE_INFO: Record<string, { nextTier: string; benefits: string[] } | null> = {
  free: {
    nextTier: 'Starter',
    benefits: [
      'Up to 3 data sources',
      'Hourly data sync',
      'CSV export',
    ],
  },
  starter: {
    nextTier: 'Professional',
    benefits: [
      'Up to 10 data sources',
      '15-minute data sync',
      'Advanced analytics & campaign drill-downs',
    ],
  },
  professional: {
    nextTier: 'Enterprise',
    benefits: [
      'Unlimited data sources',
      'Real-time data sync',
      'Priority support',
    ],
  },
  enterprise: null, // Top tier — no upgrade available
};

export function BillingSection() {
  const [state, setState] = useState<LoadingState>('loading');
  const [billing, setBilling] = useState<BillingStatus | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    fetch('/api/billing/status')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: BillingStatus) => {
        setBilling(data);
        setState('loaded');
      })
      .catch(() => setState('error'));
  }, []);

  async function handleManageSubscription() {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/billing/portal', { method: 'POST' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || 'Unable to open billing portal.');
        return;
      }
      const { portalUrl } = await res.json();
      window.location.href = portalUrl;
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setPortalLoading(false);
    }
  }

  if (state === 'loading') {
    return <BillingSkeleton />;
  }

  if (state === 'error') {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
        Failed to load billing information. Please refresh the page.
      </div>
    );
  }

  if (!billing) return null;

  const hasSubscription = billing.subscription !== null;
  const statusLabel = billing.subscription?.status
    ? billing.subscription.status.replace('_', ' ')
    : null;
  const nextBillingDate = billing.subscription?.currentPeriodEnd
    ? new Date(billing.subscription.currentPeriodEnd).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  // Format price for display (e.g., "$29.00/month")
  const formattedPrice = (() => {
    const sub = billing.subscription;
    if (!sub?.price || !sub.currency) return null;
    const amount = (sub.price / 100).toFixed(2);
    const symbol = sub.currency.toUpperCase() === 'USD' ? '$' : sub.currency.toUpperCase() + ' ';
    const cycle = sub.interval === 'year' ? '/year' : '/month';
    return `${symbol}${amount}${cycle}`;
  })();

  const billingCycleLabel = billing.subscription?.interval === 'year' ? 'Annual' : billing.subscription?.interval === 'month' ? 'Monthly' : null;

  return (
    <div className="space-y-4">
      {/* Current plan */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Current Plan</p>
          <p className="text-lg font-semibold text-gray-900">
            {billing.planName}
            {formattedPrice && (
              <span className="ml-2 text-base font-normal text-gray-500">{formattedPrice}</span>
            )}
          </p>
        </div>
        {hasSubscription && statusLabel && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              billing.subscription!.status === 'active'
                ? 'bg-green-100 text-green-800'
                : billing.subscription!.status === 'trialing'
                  ? 'bg-blue-100 text-blue-800'
                  : billing.subscription!.status === 'past_due'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
            }`}
          >
            {statusLabel}
          </span>
        )}
      </div>

      {/* Billing details */}
      {hasSubscription && (
        <div className="text-sm text-gray-600 space-y-1">
          {billingCycleLabel && (
            <p>Billing cycle: {billingCycleLabel}</p>
          )}
          {nextBillingDate && !billing.subscription!.cancelAtPeriodEnd && (
            <p>Next billing date: {nextBillingDate}</p>
          )}
          {billing.subscription!.cancelAtPeriodEnd && nextBillingDate && (
            <p className="text-yellow-700">
              Cancels on {nextBillingDate}. You retain access until then.
            </p>
          )}
          {billing.subscription!.paymentMethodLast4 && (
            <p>
              Payment method: {billing.subscription!.paymentMethodBrand
                ? `${billing.subscription!.paymentMethodBrand.charAt(0).toUpperCase()}${billing.subscription!.paymentMethodBrand.slice(1)}`
                : 'Card'}{' '}
              ending in {billing.subscription!.paymentMethodLast4}
            </p>
          )}
        </div>
      )}

      {/* Usage */}
      {billing.usage && (
        <div className="text-sm text-gray-600">
          <p className="font-medium text-gray-700 mb-1">Usage</p>
          <p>
            Data sources: {billing.usage.dataSourcesUsed} of{' '}
            {billing.usage.dataSourcesMax === -1 ? 'Unlimited' : billing.usage.dataSourcesMax}
          </p>
          {billing.usage.dataSourcesMax !== -1 &&
            billing.usage.dataSourcesUsed >= billing.usage.dataSourcesMax && (
              <p className="text-amber-600 mt-1">
                You have reached your data source limit.{' '}
                {!hasSubscription || billing.tier !== 'enterprise' ? (
                  <a href="/pricing" className="underline hover:text-amber-700">Upgrade</a>
                ) : null}
              </p>
            )}
        </div>
      )}

      {/* Upgrade CTA with value proposition */}
      {UPGRADE_INFO[billing.tier] && (
        <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-4">
          <p className="text-sm font-semibold text-gray-900">
            Unlock more with {UPGRADE_INFO[billing.tier]!.nextTier}
          </p>
          <ul className="mt-2 space-y-1">
            {UPGRADE_INFO[billing.tier]!.benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
          <a
            href="/pricing"
            className="mt-3 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
          >
            View Plans
          </a>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        {hasSubscription ? (
          <button
            onClick={handleManageSubscription}
            disabled={portalLoading}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {portalLoading ? 'Opening...' : 'Manage Subscription'}
          </button>
        ) : (
          <a
            href="/pricing"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Upgrade Plan
          </a>
        )}
      </div>
    </div>
  );
}

function BillingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
        <div className="h-6 w-32 bg-gray-100 rounded" />
      </div>
      <div className="h-3 w-48 bg-gray-100 rounded" />
      <div className="h-9 w-40 bg-gray-200 rounded-lg" />
    </div>
  );
}
