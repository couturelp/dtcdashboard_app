import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the DTC Dashboard team. Reach out for sales inquiries, support questions, or partnership opportunities.',
  openGraph: {
    title: 'Contact Us | DTC Dashboard',
    description:
      'Get in touch with the DTC Dashboard team for sales, support, or partnerships.',
    url: 'https://dtcdashboard.com/contact',
    siteName: 'DTC Dashboard',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">Contact Us</h1>
      <p className="mt-4 text-gray-600">Get in touch with our team.</p>
    </div>
  );
}
