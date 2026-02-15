import { MarketingFooter } from './_components/marketing-footer';
import { MarketingHeader } from './_components/marketing-header';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'DTC Dashboard',
            url: 'https://dtcdashboard.com',
            description: 'Profit analytics for ecommerce operators and DTC brands.',
          }),
        }}
      />
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
