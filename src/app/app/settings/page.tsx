import { Suspense } from 'react';
import { SettingsClient } from './_components/settings-client';

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your profile, security, and store configuration.
        </p>
      </div>
      <Suspense>
        <SettingsClient />
      </Suspense>
    </div>
  );
}
