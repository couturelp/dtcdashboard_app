/**
 * Next.js instrumentation — runs once when the server starts.
 * Validates that required environment variables are present and logs warnings
 * for optional-but-expected variables.
 */
export function register() {
  // Only validate on the server (not during edge runtime or build)
  if (process.env.NEXT_RUNTIME === 'edge') return;

  const missing: string[] = [];

  // Stripe billing keys — required for billing to function
  if (!process.env.STRIPE_SECRET_KEY) missing.push('STRIPE_SECRET_KEY');
  if (!process.env.STRIPE_WEBHOOK_SECRET) missing.push('STRIPE_WEBHOOK_SECRET');

  if (missing.length > 0) {
    console.warn(
      `[Startup] Missing Stripe environment variables: ${missing.join(', ')}. ` +
        'Billing features will not work until these are configured.'
    );
  }

  // STRIPE_PUBLISHABLE_KEY is documented but not currently used server-side
  // (Stripe Checkout uses redirect flow, not embedded Stripe.js).
  // Log a notice if it's missing so operators are aware.
  if (!process.env.STRIPE_PUBLISHABLE_KEY) {
    console.info(
      '[Startup] STRIPE_PUBLISHABLE_KEY is not set. This is only needed if you add embedded Stripe.js components.'
    );
  }

  // Stripe Price IDs — warn if no price IDs are configured (plan mapping won't work)
  const hasPriceIds = [
    'STRIPE_PRICE_STARTER_MONTHLY',
    'STRIPE_PRICE_STARTER_ANNUAL',
    'STRIPE_PRICE_PROFESSIONAL_MONTHLY',
    'STRIPE_PRICE_PROFESSIONAL_ANNUAL',
    'STRIPE_PRICE_ENTERPRISE_MONTHLY',
    'STRIPE_PRICE_ENTERPRISE_ANNUAL',
  ].some((key) => process.env[key]);

  if (!hasPriceIds && process.env.STRIPE_SECRET_KEY) {
    console.warn(
      '[Startup] No STRIPE_PRICE_* environment variables are set. ' +
        'Plan tier mapping will default all users to the free tier.'
    );
  }
}
