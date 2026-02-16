import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the DTC Dashboard Terms of Service. Covers service description, user accounts, acceptable use, payment terms, and more.',
  openGraph: {
    title: 'Terms of Service | DTC Dashboard',
    description:
      'DTC Dashboard Terms of Service — service description, user accounts, acceptable use, and payment terms.',
    url: 'https://dtcdashboard.com/terms',
    siteName: 'DTC Dashboard',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">Terms of Service</h1>
      <p className="mt-4 text-gray-600">Please read these terms carefully.</p>
    </div>
  );
}
