'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CURRENCIES = [
  { code: 'USD', label: 'US Dollar (USD)' },
  { code: 'EUR', label: 'Euro (EUR)' },
  { code: 'GBP', label: 'British Pound (GBP)' },
  { code: 'CAD', label: 'Canadian Dollar (CAD)' },
  { code: 'AUD', label: 'Australian Dollar (AUD)' },
  { code: 'NZD', label: 'New Zealand Dollar (NZD)' },
  { code: 'CHF', label: 'Swiss Franc (CHF)' },
  { code: 'JPY', label: 'Japanese Yen (JPY)' },
  { code: 'SEK', label: 'Swedish Krona (SEK)' },
  { code: 'NOK', label: 'Norwegian Krone (NOK)' },
  { code: 'DKK', label: 'Danish Krone (DKK)' },
  { code: 'SGD', label: 'Singapore Dollar (SGD)' },
  { code: 'HKD', label: 'Hong Kong Dollar (HKD)' },
  { code: 'MXN', label: 'Mexican Peso (MXN)' },
  { code: 'BRL', label: 'Brazilian Real (BRL)' },
  { code: 'INR', label: 'Indian Rupee (INR)' },
];

const TIMEZONES = Intl.supportedValuesOf('timeZone');

type FormStatus = 'idle' | 'submitting' | 'success' | 'error' | 'partial';

export default function SetupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York'
  );
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('Store name is required');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/store/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), currency, timezone }),
      });

      const data = await res.json();

      if (res.status === 207) {
        // Store created but database provisioning failed
        setErrorMessage(
          data.error ||
            'Store created but database provisioning failed. Please try again.'
        );
        setStatus('partial');
        return;
      }

      if (!res.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');

      // Redirect to dashboard after short delay
      setTimeout(() => {
        router.push('/app');
        router.refresh();
      }, 1500);
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Set Up Your Store</h1>
          <p className="mt-2 text-gray-600">
            Tell us about your store so we can configure your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6">
          {/* Store Name */}
          <div>
            <label htmlFor="store-name" className="block text-sm font-medium text-gray-700 mb-1">
              Store Name
            </label>
            <input
              id="store-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Shopify Store"
              maxLength={100}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={status === 'submitting' || status === 'success'}
              autoFocus
            />
          </div>

          {/* Currency */}
          <div>
            <label htmlFor="store-currency" className="block text-sm font-medium text-gray-700 mb-1">
              Base Currency
            </label>
            <select
              id="store-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={status === 'submitting' || status === 'success'}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Timezone */}
          <div>
            <label htmlFor="store-timezone" className="block text-sm font-medium text-gray-700 mb-1">
              Timezone
            </label>
            <select
              id="store-timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={status === 'submitting' || status === 'success'}
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Error Message */}
          {status === 'error' && errorMessage && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Partial Success Message (store created, provisioning failed) */}
          {status === 'partial' && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-700">
              {errorMessage || 'Store created but database setup failed. Please try again.'}
            </div>
          )}

          {/* Success Message */}
          {status === 'success' && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
              Store created successfully. Redirecting to your dashboard...
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'submitting' ? 'Creating Store...' : status === 'partial' ? 'Retry Setup' : 'Create Store'}
          </button>
        </form>
      </div>
    </div>
  );
}
