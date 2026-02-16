'use client';

import { useState } from 'react';

type FormStatus = 'idle' | 'saving' | 'success' | 'error';

export function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const canSubmit =
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    newPassword === confirmPassword;

  function clearForm() {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setStatus('error');
      return;
    }

    setStatus('saving');
    setMessage('');

    try {
      const res = await fetch('/api/user/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Failed to update password');
        setStatus('error');
        return;
      }

      setMessage('Password updated successfully');
      setStatus('success');
      clearForm();

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
        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
          Current Password
        </label>
        <input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => { setCurrentPassword(e.target.value); setStatus('idle'); setMessage(''); }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={status === 'saving'}
          autoComplete="current-password"
        />
      </div>

      <div>
        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => { setNewPassword(e.target.value); setStatus('idle'); setMessage(''); }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={status === 'saving'}
          autoComplete="new-password"
        />
        <p className="mt-1 text-xs text-gray-500">
          Minimum 8 characters with at least one number.
        </p>
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm New Password
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value); setStatus('idle'); setMessage(''); }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={status === 'saving'}
          autoComplete="new-password"
        />
        {confirmPassword.length > 0 && newPassword !== confirmPassword && (
          <p className="mt-1 text-xs text-red-600">Passwords do not match.</p>
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
          disabled={!canSubmit || status === 'saving'}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'saving' ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </form>
  );
}
