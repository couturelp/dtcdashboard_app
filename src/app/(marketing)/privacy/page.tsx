import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how DTC Dashboard collects, uses, and protects your data. Covers data storage, third-party services, cookies, and your privacy rights.',
  openGraph: {
    title: 'Privacy Policy | DTC Dashboard',
    description:
      'How DTC Dashboard handles your data — collection, storage, third-party services, and your rights.',
    url: 'https://dtcdashboard.com/privacy',
    siteName: 'DTC Dashboard',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-gray-600">How we handle your data.</p>
    </div>
  );
}
