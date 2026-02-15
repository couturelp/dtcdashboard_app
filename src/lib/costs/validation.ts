// src/lib/costs/validation.ts

// ISO 4217 currency codes (common subset for ecommerce)
const VALID_CURRENCIES = new Set([
  'USD',
  'EUR',
  'GBP',
  'CAD',
  'AUD',
  'NZD',
  'JPY',
  'CHF',
  'SEK',
  'NOK',
  'DKK',
  'SGD',
  'HKD',
  'MXN',
  'BRL',
  'INR',
  'ZAR',
  'ILS',
  'PLN',
  'CZK',
]);

export function isValidCurrency(code: string): boolean {
  return VALID_CURRENCIES.has(code.toUpperCase());
}

export function isPositiveAmount(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value) && value >= 0;
}

export function isValidDate(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const d = new Date(value);
  return !isNaN(d.getTime());
}

const VALID_FREQUENCIES = ['one_time', 'monthly', 'quarterly', 'annual'] as const;
export type ExpenseFrequency = (typeof VALID_FREQUENCIES)[number];

export function isValidFrequency(value: unknown): value is ExpenseFrequency {
  return typeof value === 'string' && VALID_FREQUENCIES.includes(value as ExpenseFrequency);
}

const VALID_RATE_TYPES = ['flat', 'per_item', 'weight_based', 'shopify_default'] as const;
export type ShippingRateType = (typeof VALID_RATE_TYPES)[number];

export function isValidRateType(value: unknown): value is ShippingRateType {
  return typeof value === 'string' && VALID_RATE_TYPES.includes(value as ShippingRateType);
}

const DEFAULT_CATEGORIES = [
  'Packaging',
  'Returns/Refunds',
  'Freelancers',
  'Marketing (non-ad)',
  'Samples',
  'Other',
] as const;

export function isValidCategory(value: unknown): boolean {
  // Allow predefined + any custom string (non-empty)
  return typeof value === 'string' && value.trim().length > 0;
}

export { VALID_CURRENCIES, VALID_FREQUENCIES, VALID_RATE_TYPES, DEFAULT_CATEGORIES };
