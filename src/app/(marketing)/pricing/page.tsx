import type { Metadata } from 'next';
import PricingContent from './pricing-content';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for DTC Dashboard. Start free, upgrade as your business grows. All plans include core profit analytics.',
  openGraph: {
    title: 'Pricing | DTC Dashboard',
    description:
      'Simple, transparent pricing for DTC Dashboard. Start free, upgrade as your business grows.',
    url: '/pricing',
  },
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I try DTC Dashboard for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Our Free plan lets you connect one data source and get started with core profit analytics at no cost. No credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I change plans later?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and we prorate any billing differences.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens when I reach my data source limit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "You'll still have full access to your existing data sources. To connect additional sources, you can upgrade to a plan with a higher limit.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer annual billing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all paid plans offer annual billing at a ~20% discount compared to monthly billing. You can switch between monthly and annual at any time.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept all major credit cards (Visa, Mastercard, American Express) via Stripe. All payments are securely processed with bank-level encryption.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I cancel my subscription?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can cancel your subscription at any time from your account settings. Your access continues until the end of your current billing period.',
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <PricingContent />
    </>
  );
}
