import type { Metadata } from 'next';
import { MarketingFooter } from '../(marketing)/_components/marketing-footer';
import { MarketingHeader } from '../(marketing)/_components/marketing-header';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on ecommerce profitability, marketing analytics, and growing your DTC brand.',
  openGraph: {
    title: 'Blog | DTC Dashboard',
    description:
      'Insights on ecommerce profitability, marketing analytics, and growing your DTC brand.',
    url: 'https://dtcdashboard.com/blog',
    siteName: 'DTC Dashboard',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
