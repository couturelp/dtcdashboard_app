import type { Metadata } from 'next';
import { FeatureHighlightsSection } from './_components/feature-highlights-section';
import { FinalCtaSection } from './_components/final-cta-section';
import { HeroSection } from './_components/hero-section';
import { HowItWorksSection } from './_components/how-it-works-section';
import { PlatformLogosSection } from './_components/platform-logos-section';
import { ProblemSolutionSection } from './_components/problem-solution-section';
import { SocialProofBar } from './_components/social-proof-bar';

export const metadata: Metadata = {
  title: 'DTC Dashboard | Profit Analytics for Ecommerce Brands',
  description:
    'See exactly where your money goes. DTC Dashboard connects your Shopify store and ad platforms, combines them with your costs, and shows you real profit numbers.',
  openGraph: {
    title: 'DTC Dashboard | Profit Analytics for Ecommerce Brands',
    description:
      'See exactly where your money goes. DTC Dashboard connects your Shopify store and ad platforms, combines them with your costs, and shows you real profit numbers.',
    url: 'https://dtcdashboard.com',
    siteName: 'DTC Dashboard',
    type: 'website',
  },
};

const WEBPAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'DTC Dashboard | Profit Analytics for Ecommerce Brands',
  description:
    'See exactly where your money goes. DTC Dashboard connects your Shopify store and ad platforms, combines them with your costs, and shows you real profit numbers.',
  url: 'https://dtcdashboard.com',
  isPartOf: {
    '@type': 'WebSite',
    name: 'DTC Dashboard',
    url: 'https://dtcdashboard.com',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_SCHEMA) }}
      />
      <HeroSection />
      <SocialProofBar />
      <ProblemSolutionSection />
      <FeatureHighlightsSection />
      <HowItWorksSection />
      <PlatformLogosSection />
      <FinalCtaSection />
    </>
  );
}
