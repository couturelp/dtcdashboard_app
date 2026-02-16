'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PlanPrice {
  priceId: string;
  amount: number; // cents
  currency: string;
  interval: 'month' | 'year';
}

interface PlanFeatures {
  maxDataSources: number;
  syncFrequency: string;
  exportEnabled: boolean;
  advancedAnalytics: boolean;
  prioritySupport: boolean;
}

interface Plan {
  tier: string;
  productName: string;
  prices: PlanPrice[];
  features: PlanFeatures;
}

// Static free tier for display (not from Stripe since free has no price)
const FREE_TIER: Plan = {
  tier: 'free',
  productName: 'Free',
  prices: [],
  features: {
    maxDataSources: 1,
    syncFrequency: '6h',
    exportEnabled: false,
    advancedAnalytics: false,
    prioritySupport: false,
  },
};

const SYNC_LABELS: Record<string, string> = {
  '6h': 'Every 6 hours',
  '1h': 'Every hour',
  '15m': 'Every 15 min',
  realtime: 'Real-time',
};

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount / 100);
}

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('month');

  useEffect(() => {
    fetch('/api/billing/plans')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load plans');
        return res.json();
      })
      .then((data: { plans: Plan[] }) => {
        setPlans(data.plans);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const allPlans = [FREE_TIER, ...plans];
  const hasAnnual = plans.some((p) => p.prices.some((pr) => pr.interval === 'year'));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-heading tracking-tight">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-lg text-brand-body">
          Start free. Upgrade as your business grows. All plans include core profit analytics.
        </p>
      </div>

      {/* Billing toggle */}
      {hasAnnual && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${billingCycle === 'month' ? 'text-brand-heading' : 'text-brand-muted'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle((c) => (c === 'month' ? 'year' : 'month'))}
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            style={{ backgroundColor: billingCycle === 'year' ? 'var(--brand-primary)' : '#d1d5db' }}
            role="switch"
            aria-checked={billingCycle === 'year'}
            aria-label="Toggle annual billing"
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                billingCycle === 'year' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${billingCycle === 'year' ? 'text-brand-heading' : 'text-brand-muted'}`}>
            Annual
          </span>
          {billingCycle === 'year' && (
            <span className="ml-1 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Save ~20%
            </span>
          )}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="h-5 w-24 bg-gray-200 rounded mb-4" />
              <div className="h-8 w-20 bg-gray-100 rounded mb-6" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-3 w-full bg-gray-100 rounded" />
                ))}
              </div>
              <div className="h-10 w-full bg-gray-200 rounded-lg mt-8" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-16 max-w-md mx-auto rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 text-center">
          {error}. Please refresh the page.
        </div>
      )}

      {/* Plans grid */}
      {!loading && !error && (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {allPlans.map((plan) => {
            const price = plan.prices.find((p) => p.interval === billingCycle) || plan.prices[0];
            const isPopular = plan.tier === 'professional';
            const isFree = plan.tier === 'free';

            return (
              <div
                key={plan.tier}
                className={`relative rounded-xl border p-6 flex flex-col ${
                  isPopular
                    ? 'border-brand-primary shadow-lg shadow-brand-primary/10 ring-1 ring-brand-primary'
                    : 'border-gray-200'
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-brand-primary px-3 py-0.5 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}

                <h3 className="text-lg font-semibold text-brand-heading">{plan.productName}</h3>

                <div className="mt-4 mb-6">
                  {isFree ? (
                    <p className="text-3xl font-bold text-brand-heading">$0</p>
                  ) : price ? (
                    <div>
                      <span className="text-3xl font-bold text-brand-heading">
                        {formatPrice(price.amount, price.currency)}
                      </span>
                      <span className="text-sm text-brand-muted">
                        /{price.interval === 'year' ? 'year' : 'mo'}
                      </span>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-brand-heading">Custom</p>
                  )}
                </div>

                {/* Feature list */}
                <ul className="space-y-3 text-sm text-brand-body flex-1">
                  <FeatureRow
                    label={`${plan.features.maxDataSources === -1 ? 'Unlimited' : plan.features.maxDataSources} data source${plan.features.maxDataSources === 1 ? '' : 's'}`}
                    included
                  />
                  <FeatureRow
                    label={SYNC_LABELS[plan.features.syncFrequency] || plan.features.syncFrequency}
                    sublabel="sync frequency"
                    included
                  />
                  <FeatureRow label="CSV export" included={plan.features.exportEnabled} />
                  <FeatureRow label="Advanced analytics" included={plan.features.advancedAnalytics} />
                  <FeatureRow label="Priority support" included={plan.features.prioritySupport} />
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  {isFree ? (
                    <Link
                      href="/app/register"
                      className="block w-full text-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-brand-heading hover:bg-gray-50 transition-colors"
                    >
                      Get Started Free
                    </Link>
                  ) : plan.tier === 'enterprise' && !price ? (
                    <Link
                      href="/contact"
                      className="block w-full text-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-brand-heading hover:bg-gray-50 transition-colors"
                    >
                      Contact Sales
                    </Link>
                  ) : (
                    <Link
                      href="/app/register"
                      className={`block w-full text-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                        isPopular
                          ? 'bg-brand-primary text-white hover:bg-brand-primary-hover shadow-md shadow-brand-primary/25'
                          : 'bg-brand-primary text-white hover:bg-brand-primary-hover'
                      }`}
                    >
                      Start Free Trial
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Feature comparison table */}
      {!loading && !error && allPlans.length > 1 && (
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-brand-heading text-center mb-10">
            Compare plans
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 text-left text-xs font-medium text-brand-muted uppercase tracking-wide">
                    Feature
                  </th>
                  {allPlans.map((p) => (
                    <th
                      key={p.tier}
                      className="py-3 px-4 text-center text-xs font-medium text-brand-muted uppercase tracking-wide"
                    >
                      {p.productName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <ComparisonRow
                  feature="Data sources"
                  values={allPlans.map((p) =>
                    p.features.maxDataSources === -1 ? 'Unlimited' : String(p.features.maxDataSources)
                  )}
                />
                <ComparisonRow
                  feature="Sync frequency"
                  values={allPlans.map((p) => SYNC_LABELS[p.features.syncFrequency] || p.features.syncFrequency)}
                />
                <ComparisonRow
                  feature="CSV export"
                  values={allPlans.map((p) => p.features.exportEnabled)}
                />
                <ComparisonRow
                  feature="Advanced analytics"
                  values={allPlans.map((p) => p.features.advancedAnalytics)}
                />
                <ComparisonRow
                  feature="Priority support"
                  values={allPlans.map((p) => p.features.prioritySupport)}
                />
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureRow({ label, sublabel, included }: { label: string; sublabel?: string; included: boolean }) {
  return (
    <li className="flex items-start gap-2">
      {included ? (
        <svg className="w-4 h-4 text-green-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      <span className={included ? 'text-brand-body' : 'text-brand-muted'}>
        {label}
        {sublabel && <span className="text-brand-muted"> {sublabel}</span>}
      </span>
    </li>
  );
}

function ComparisonRow({ feature, values }: { feature: string; values: (string | boolean)[] }) {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-3 pr-4 text-sm font-medium text-brand-body">{feature}</td>
      {values.map((v, i) => (
        <td key={i} className="py-3 px-4 text-center">
          {typeof v === 'boolean' ? (
            v ? (
              <svg className="w-5 h-5 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
              </svg>
            )
          ) : (
            <span className="text-sm text-brand-body">{v}</span>
          )}
        </td>
      ))}
    </tr>
  );
}
