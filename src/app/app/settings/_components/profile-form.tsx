'use client';

import { useState } from 'react';

interface ProfileFormProps {
  initialName: string;
  initialEmail: string;
}

type FormStatus = 'idle' | 'saving' | 'success' | 'error';

export function ProfileForm({ initialName, initialEmail }: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const isDirty = name !== initialName || email !== initialEmail;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isDirty) return;

    setStatus('saving');
    setMessage('');

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Failed to update profile');
        setStatus('error');
        return;
      }

      setMessage(data.message || 'Profile updated successfully');
      setStatus('success');

      // Clear success after 3 seconds
      setTimeout(() => {
        if (setStatus) setStatus('idle');
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
        <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          id="profile-name"
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setStatus('idle'); setMessage(''); }}
          maxLength={100}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={status === 'saving'}
        />
      </div>

      <div>
        <label htmlFor="profile-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="profile-email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle'); setMessage(''); }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={status === 'saving'}
        />
        {email !== initialEmail && (
          <p className="mt-1 text-xs text-amber-600">
            Changing your email will require re-verification.
          </p>
        )}
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
