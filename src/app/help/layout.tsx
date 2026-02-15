import type { Metadata } from 'next';
import { MarketingHeader } from '../(marketing)/_components/marketing-header';
import { MarketingFooter } from '../(marketing)/_components/marketing-footer';

export const metadata: Metadata = {
  title: 'Help Center',
  description:
    'Find answers to common questions about DTC Dashboard. Setup guides, feature documentation, and troubleshooting.',
  openGraph: {
    title: 'Help Center | DTC Dashboard',
    description:
      'Find answers to common questions about DTC Dashboard. Setup guides, feature documentation, and troubleshooting.',
    url: 'https://dtcdashboard.com/help',
    siteName: 'DTC Dashboard',
    type: 'website',
  },
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
