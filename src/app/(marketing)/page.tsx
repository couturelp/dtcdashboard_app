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

export default function HomePage() {
  return (
    <>
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
