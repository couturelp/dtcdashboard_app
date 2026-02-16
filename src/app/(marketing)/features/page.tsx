import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features | DTC Dashboard',
  description:
    'Profit analytics, marketing performance, cost management, automated data integrations, multi-currency support, and data export — everything you need to track real DTC profitability.',
  openGraph: {
    title: 'Features | DTC Dashboard',
    description:
      'Profit analytics, marketing performance, cost management, automated data integrations, multi-currency support, and data export — everything you need to track real DTC profitability.',
    url: 'https://dtcdashboard.com/features',
    siteName: 'DTC Dashboard',
    type: 'website',
  },
};

const WEBPAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Features | DTC Dashboard',
  description:
    'Profit analytics, marketing performance, cost management, automated data integrations, multi-currency support, and data export — everything you need to track real DTC profitability.',
  url: 'https://dtcdashboard.com/features',
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
        name: 'Features',
        item: 'https://dtcdashboard.com/features',
      },
    ],
  },
};

export default function FeaturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_SCHEMA) }}
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold">Features</h1>
        <p className="mt-4 text-gray-600">Everything you need to track DTC profitability.</p>
      </div>
    </>
  );
}
