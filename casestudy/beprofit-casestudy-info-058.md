# BeProfit Troubleshooting: Reporting & Calculation Issues

## Source
- **Primary URL:** https://help.runviably.com/beprofit
- **Category:** Help Center / Troubleshooting / Reporting & Calculations
- **Date Captured:** 2026-02-13
- **Research Status:** ⚠️ TEMPLATE - Requires manual help center research

## Research Objective
Document reporting accuracy troubleshooting, calculation discrepancy explanations, profit calculation edge cases (refunds, chargebacks, gift cards), and workarounds for known limitations.

## Section Structure:

### Reporting Accuracy Issues
- [ ] Dashboard metrics not matching expected values
- [ ] Report export data discrepancies
- [ ] Date range calculation issues
- [ ] Real-time vs historical report differences
- [ ] Custom report accuracy problems
- [ ] Attribution reporting discrepancies

**For each issue type, document:**
- Symptom/error description
- Root cause explanation
- Verification steps
- Resolution procedure
- Prevention tips

### Profit Calculation Discrepancies
- [ ] Net profit calculations not matching expectations
- [ ] Gross profit vs net profit confusion
- [ ] Margin percentage calculations
- [ ] Revenue recognition timing issues
- [ ] Cost allocation problems
- [ ] Expense attribution errors
- [ ] Multi-currency profit calculations
- [ ] Profit by product calculations
- [ ] Profit by channel calculations

**Common calculation scenarios:**
- Standard order: `Revenue - COGS - Shipping Cost - Ad Spend - Fees = Net Profit`
- Refunded order: How is profit adjusted?
- Partially refunded order: Calculation logic
- Subscription order: Recurring vs one-time profit
- Multi-item order: Profit allocation per item

### Edge Cases in Profit Calculation

**Refunds:**
- [ ] Full refund calculation logic
  - Is COGS reversed?
  - Are shipping costs recovered or lost?
  - How are ad spend and fees handled?
  - Transaction fee treatment on refunds
- [ ] Partial refund calculation
  - Item-level vs order-level refund
  - Shipping cost allocation on partial refunds
  - COGS adjustment for partial returns
- [ ] Refund timing issues
  - Order in Month 1, refund in Month 2 - where does it show?
  - Same-day refunds vs delayed refunds
- [ ] Refund without return (customer keeps product)
- [ ] Restocking fees and their impact on profit

**Chargebacks:**
- [ ] Chargeback impact on profit calculations
- [ ] Chargeback fees deduction
- [ ] Won vs lost chargeback handling
- [ ] Chargeback timing and reporting period
- [ ] Chargeback reversals

**Gift Cards:**
- [ ] Gift card purchase revenue recognition
- [ ] Gift card redemption and profit calculation
- [ ] Unused gift card liability
- [ ] Gift card expiration handling
- [ ] Partial gift card redemption

**Discounts & Promotions:**
- [ ] How percentage discounts affect revenue calculation
- [ ] Fixed amount discount treatment
- [ ] Free shipping promotion impact on profit
- [ ] Buy-one-get-one (BOGO) profit calculation
- [ ] Store credit and how it affects profit
- [ ] Loyalty points redemption

**Taxes:**
- [ ] Sales tax collection and profit impact
- [ ] VAT handling in profit calculations
- [ ] Tax-inclusive vs tax-exclusive pricing
- [ ] Tax refunds on returns

**Shipping:**
- [ ] Free shipping (customer pays $0) - is cost deducted from profit?
- [ ] Flat rate shipping vs actual shipping cost
- [ ] Shipping overcharge/undercharge scenarios
- [ ] International shipping and customs fees
- [ ] Shipping insurance cost allocation

**Bundles & Kits:**
- [ ] Bundle product profit calculation
- [ ] COGS allocation across bundle items
- [ ] Discounted bundle pricing and profit
- [ ] Partial returns of bundle items

**Pre-orders & Backorders:**
- [ ] When is profit recognized for pre-orders?
- [ ] Backorder revenue timing
- [ ] Deposit/partial payment handling

**Subscription Products:**
- [ ] Subscription first payment vs recurring payments
- [ ] Subscription cancellation profit impact
- [ ] Prorated subscription refunds
- [ ] Subscription upgrade/downgrade profit

### Known Calculation Limitations
- [ ] Documented limitations in profit calculation
- [ ] What BeProfit can't track (list)
- [ ] Manual adjustment requirements
- [ ] Data that must be manually entered
- [ ] Integration limitations affecting calculations
- [ ] Workarounds for unsupported scenarios
- [ ] Feature requests for calculation improvements

**Examples of potential limitations:**
- "BeProfit cannot track cash-on-delivery (COD) fees automatically"
- "Multi-warehouse COGS must be manually configured"
- "Influencer commission tracking requires manual expense entry"

### Report-Specific Issues

**Dashboard Report:**
- [ ] Dashboard widget not loading
- [ ] Dashboard metrics frozen/not updating
- [ ] Dashboard date range issues
- [ ] Dashboard filters not working

**Product Performance Report:**
- [ ] Product profit by SKU accuracy
- [ ] Variant-level profit calculation issues
- [ ] Out-of-stock product reporting
- [ ] Discontinued product handling

**Marketing Attribution Report:**
- [ ] UTM parameter tracking issues
- [ ] First-touch vs last-touch attribution discrepancies
- [ ] Multi-touch attribution calculation
- [ ] Ad spend attribution by campaign

**Customer Lifetime Value (LTV) Report:**
- [ ] LTV calculation methodology
- [ ] New vs returning customer profit
- [ ] Customer cohort analysis accuracy

**Expense Report:**
- [ ] Manual expense not appearing
- [ ] Recurring expense timing
- [ ] Expense category allocation issues

### Data Validation & Verification
- [ ] How to verify BeProfit calculations are correct
- [ ] Cross-checking with Shopify reports
- [ ] Cross-checking with ad platform spend
- [ ] Reconciliation procedures
- [ ] Audit trail for calculations
- [ ] Calculation transparency (can users see the formula?)

### Calculation Settings & Customization
- [ ] Profit calculation method selection (if customizable)
- [ ] COGS calculation rules configuration
- [ ] Attribution window settings
- [ ] Revenue recognition timing settings
- [ ] Expense allocation rules

### Troubleshooting Steps (Generic)

**When profit numbers look wrong:**
1. Check COGS settings - are product costs configured correctly?
2. Verify integration connections - are all platforms syncing?
3. Review date range - is the time period correct?
4. Check currency settings - multi-currency issues?
5. Review manual adjustments - were any custom entries made?
6. Compare with source platform (Shopify) - do order totals match?
7. Check for pending data sync - is sync complete?
8. Review expense entries - are all costs accounted for?

### Help Articles Expected
- "Why doesn't my profit match Shopify?"
- "How are refunds calculated?"
- "Understanding profit calculation"
- "How to verify profit accuracy"
- "Common calculation discrepancies explained"
- "Edge cases in profit reporting"
- "Manual adjustments to profit"

**Research Questions:**
1. Does BeProfit provide a detailed profit calculation breakdown per order?
2. Can users see the exact formula used for profit calculations?
3. How does BeProfit handle refunds in different months than the original order?
4. Is there a reconciliation report to compare BeProfit vs platform data?
5. What edge cases are explicitly documented (gift cards, chargebacks, etc.)?
6. Are there known limitations or unsupported scenarios?
7. Can users override calculated values?
8. Is there a calculation audit log?
9. How transparent is the attribution model?
10. What happens when data from multiple sources conflicts?
