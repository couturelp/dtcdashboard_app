'use client';

import { useEffect, useState } from 'react';

interface BillingStatus {
  tier: string;
  planName: string;
  subscription: {
    status: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  } | null;
}

type LoadingState = 'loading' | 'loaded' | 'error';

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

  return (
    <div className="space-y-4">
      {/* Current plan */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Current Plan</p>
          <p className="text-lg font-semibold text-gray-900">{billing.planName}</p>
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
          {nextBillingDate && !billing.subscription!.cancelAtPeriodEnd && (
            <p>Next billing date: {nextBillingDate}</p>
          )}
          {billing.subscription!.cancelAtPeriodEnd && nextBillingDate && (
            <p className="text-yellow-700">
              Cancels on {nextBillingDate}. You retain access until then.
            </p>
          )}
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
            href="/app/settings?billing=upgrade"
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
