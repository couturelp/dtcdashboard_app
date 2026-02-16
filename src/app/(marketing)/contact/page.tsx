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

const WEBPAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Contact Us | DTC Dashboard',
  description:
    'Get in touch with the DTC Dashboard team. Reach out for sales inquiries, support questions, or partnership opportunities.',
  url: 'https://dtcdashboard.com/contact',
  isPartOf: {
    '@type': 'WebSite',
    name: 'DTC Dashboard',
    url: 'https://dtcdashboard.com',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://dtcdashboard.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact',
        item: 'https://dtcdashboard.com/contact',
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_SCHEMA) }}
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-gray-600">Get in touch with our team.</p>
      </div>
    </>
  );
}
