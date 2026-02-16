'use client';

import { useState } from 'react';

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

interface StoreFormProps {
  initialName: string;
  initialCurrency: string;
  initialTimezone: string;
}

type FormStatus = 'idle' | 'saving' | 'success' | 'error';

export function StoreForm({ initialName, initialCurrency, initialTimezone }: StoreFormProps) {
  const [name, setName] = useState(initialName);
  const [currency, setCurrency] = useState(initialCurrency);
  const [timezone, setTimezone] = useState(initialTimezone);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const isDirty =
    name !== initialName || currency !== initialCurrency || timezone !== initialTimezone;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isDirty) return;

    setStatus('saving');
    setMessage('');

    try {
      const res = await fetch('/api/store/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), currency, timezone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Failed to update store settings');
        setStatus('error');
        return;
      }

      setMessage('Store settings updated successfully');
      setStatus('success');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch {
      setMessage('Network error. Please try again.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="store-name" className="block text-sm font-medium text-gray-700 mb-1">
          Store Name
        </label>
        <input
          id="store-name"
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setStatus('idle'); setMessage(''); }}
          maxLength={100}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={status === 'saving'}
        />
      </div>

      <div>
        <label htmlFor="store-currency" className="block text-sm font-medium text-gray-700 mb-1">
          Base Currency
        </label>
        <select
          id="store-currency"
          value={currency}
          onChange={(e) => { setCurrency(e.target.value); setStatus('idle'); setMessage(''); }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={status === 'saving'}
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="store-timezone" className="block text-sm font-medium text-gray-700 mb-1">
          Timezone
        </label>
        <select
          id="store-timezone"
          value={timezone}
          onChange={(e) => { setTimezone(e.target.value); setStatus('idle'); setMessage(''); }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={status === 'saving'}
        >
          {TIMEZONES.map((tz) => (
            <option key={tz} value={tz}>
              {tz.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      </div>

      {message && (
        <div
          className={`rounded-lg border p-3 text-sm ${
            status === 'error'
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-green-50 border-green-200 text-green-700'
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isDirty || status === 'saving'}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'saving' ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
