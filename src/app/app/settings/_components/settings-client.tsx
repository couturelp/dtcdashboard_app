'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProfileForm } from './profile-form';
import { PasswordForm } from './password-form';
import { StoreForm } from './store-form';
import { BillingSection } from './billing-section';

interface ProfileData {
  name: string;
  email: string;
}

interface StoreData {
  name: string;
  currency: string;
  timezone: string;
}

type LoadingState = 'loading' | 'loaded' | 'error';

export function SettingsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [billingMessage, setBillingMessage] = useState<{ type: 'success' | 'canceled'; text: string } | null>(null);
  const [profileState, setProfileState] = useState<LoadingState>('loading');
  const [storeState, setStoreState] = useState<LoadingState>('loading');
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [store, setStore] = useState<StoreData | null>(null);

  // Show billing feedback from Stripe Checkout redirect
  useEffect(() => {
    const billing = searchParams.get('billing');
    if (billing === 'success') {
      setBillingMessage({ type: 'success', text: 'Your subscription is now active! It may take a moment to reflect.' });
      // Clean up the URL query param without a page reload
      router.replace('/app/settings', { scroll: false });
    } else if (billing === 'canceled') {
      setBillingMessage({ type: 'canceled', text: 'Checkout was canceled. No charges were made.' });
      router.replace('/app/settings', { scroll: false });
    }
  }, [searchParams, router]);

  useEffect(() => {
    fetch('/api/user/profile')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: ProfileData) => {
        setProfile(data);
        setProfileState('loaded');
      })
      .catch(() => setProfileState('error'));

    fetch('/api/store/settings')
      .then((res) => {
        if (res.status === 404) {
          // No store yet -- not an error, just no store section
          setStore(null);
          setStoreState('loaded');
          return null;
        }
        if (!res.ok) return Promise.reject();
        return res.json();
      })
      .then((data: StoreData | null) => {
        if (data) {
          setStore(data);
          setStoreState('loaded');
        }
      })
      .catch(() => setStoreState('error'));
  }, []);

  return (
    <div className="space-y-8">
      {/* Billing redirect feedback */}
      {billingMessage && (
        <div
          className={`rounded-lg border p-4 text-sm flex items-center justify-between ${
            billingMessage.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-yellow-50 border-yellow-200 text-yellow-800'
          }`}
        >
          <span>{billingMessage.text}</span>
          <button
            onClick={() => setBillingMessage(null)}
            className="ml-4 text-current opacity-60 hover:opacity-100"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

      {/* Profile Section */}
      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your name and email address.
          </p>
        </div>
        <div className="px-4 py-5 sm:px-6">
          {profileState === 'loading' && <FormSkeleton rows={2} />}
          {profileState === 'error' && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              Failed to load profile data. Please refresh the page.
            </div>
          )}
          {profileState === 'loaded' && profile && (
            <ProfileForm initialName={profile.name} initialEmail={profile.email} />
          )}
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          <p className="mt-1 text-sm text-gray-500">
            Change your password.
          </p>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <PasswordForm />
        </div>
      </section>

      {/* Store Section */}
      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-gray-900">Store</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your store configuration.
          </p>
        </div>
        <div className="px-4 py-5 sm:px-6">
          {storeState === 'loading' && <FormSkeleton rows={3} />}
          {storeState === 'error' && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              Failed to load store settings. Please refresh the page.
            </div>
          )}
          {storeState === 'loaded' && !store && (
            <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 text-sm text-gray-600">
              No store configured.{' '}
              <a href="/app/setup" className="text-blue-600 hover:underline font-medium">
                Set up your store
              </a>{' '}
              to get started.
            </div>
          )}
          {storeState === 'loaded' && store && (
            <StoreForm
              initialName={store.name}
              initialCurrency={store.currency}
              initialTimezone={store.timezone}
            />
          )}
        </div>
      </section>

      {/* Billing Section */}
      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-gray-900">Billing</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your subscription and billing details.
          </p>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <BillingSection />
        </div>
      </section>
    </div>
  );
}

function FormSkeleton({ rows }: { rows: number }) {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i}>
          <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
          <div className="h-9 w-full bg-gray-100 rounded-lg" />
        </div>
      ))}
      <div className="flex justify-end">
        <div className="h-9 w-28 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}
