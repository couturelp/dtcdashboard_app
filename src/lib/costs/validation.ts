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

export function isValidCurrency(code: unknown): boolean {
  if (typeof code !== 'string') return false;
  return VALID_CURRENCIES.has(code.toUpperCase());
}

/** Upper bound for monetary amounts in cents ($10 million = 1,000,000,000 cents). */
export const MAX_AMOUNT_CENTS = 1_000_000_000;

export function isPositiveAmount(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value) && value >= 0 && Number.isInteger(value) && value <= MAX_AMOUNT_CENTS;
}

export function isValidDate(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  // Require YYYY-MM-DD format to prevent ambiguous date parsing
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value + 'T00:00:00Z');
  if (isNaN(d.getTime())) return false;
  // Reject overflow dates like Feb 31 → Mar 3: parsed date must match input components
  const [y, m, day] = value.split('-').map(Number);
  return d.getUTCFullYear() === y && d.getUTCMonth() + 1 === m && d.getUTCDate() === day;
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

/** Maximum length for free-text fields (name, category). */
export const MAX_TEXT_FIELD_LENGTH = 500;

export function isValidName(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= MAX_TEXT_FIELD_LENGTH;
}

export function isValidCategory(value: unknown): boolean {
  // Allow predefined + any custom string (non-empty, bounded length)
  return typeof value === 'string' && value.trim().length > 0 && value.length <= MAX_TEXT_FIELD_LENGTH;
}

export { VALID_CURRENCIES, VALID_FREQUENCIES, VALID_RATE_TYPES, DEFAULT_CATEGORIES };
