# BeProfit Data Management & Privacy

## Source
- **Primary URL:** https://help.runviably.com/beprofit
- **Category:** Help Center / Data Management & Privacy
- **Date Captured:** 2026-02-13
- **Research Status:** ⚠️ TEMPLATE - Requires manual help center research

---

## Research Objective

Document BeProfit's data handling practices, deletion/export capabilities, GDPR compliance, retention policies, and compliance certifications. This information is critical for understanding how BeProfit manages customer data, supports privacy regulations, and implements data governance.

---

## Section Structure

### Data Handling Practices

**Expected Help Articles:**
- "How BeProfit stores your data"
- "Data security and encryption"
- "Third-party data sharing policies"
- "Data processing agreements"

**Key Areas to Document:**
- [ ] How BeProfit stores customer data
  - Database architecture (if disclosed)
  - Data storage providers (AWS, Google Cloud, Azure, etc.)
  - Data center locations and regions
  - Multi-tenancy vs isolated data storage
- [ ] Data processing locations (servers, regions)
  - Primary data processing region (US, EU, etc.)
  - Secondary/backup regions
  - Data residency options for compliance
- [ ] Data security measures mentioned
  - Infrastructure security (firewalls, VPCs, network isolation)
  - Application-level security controls
  - Access logging and monitoring
  - Intrusion detection systems
  - Regular security assessments
- [ ] Encryption practices (at rest, in transit)
  - Encryption at rest: AES-256, other standards
  - Encryption in transit: TLS 1.2+, SSL certificates
  - Database encryption
  - Backup encryption
  - Key management practices
- [ ] Data access controls
  - Role-based access control (RBAC)
  - Multi-factor authentication requirements for staff
  - Principle of least privilege
  - Access review processes
- [ ] Third-party data sharing (if any)
  - Which third parties receive data
  - Purpose of data sharing (analytics, payments, support)
  - Data minimization practices
  - Third-party security assessments
- [ ] Subprocessors and vendors
  - List of subprocessors (payment processors, email providers, hosting)
  - Subprocessor agreements and compliance
  - Changes to subprocessor list notification process
- [ ] Data anonymization practices
  - When/how data is anonymized
  - Aggregate analytics and reporting
  - Test/development environment data handling

**Questions to Answer:**
1. Where are BeProfit's primary data centers located?
2. Does BeProfit use a specific cloud provider (AWS, Google Cloud, Azure)?
3. Is customer data encrypted at rest and in transit?
4. What encryption standards are used (AES-256, TLS 1.3)?
5. Are there regional data storage options for GDPR/compliance?
6. Does BeProfit share data with third parties for advertising or marketing?
7. Can customers request a list of subprocessors?
8. How is data isolated between different customer accounts?

---

### Data Deletion & Export

**Expected Help Articles:**
- "How to delete your BeProfit account"
- "Exporting your data from BeProfit"
- "Data retention after account cancellation"
- "Right to be forgotten requests"

**Key Areas to Document:**
- [ ] Account deletion process
  - How to initiate account deletion (settings page, support request)
  - Account deletion confirmation steps
  - What happens to data immediately upon deletion request
  - Recovery period (if any) before permanent deletion
  - Admin vs user deletion capabilities
- [ ] Data deletion timeline (immediate vs delayed)
  - Immediate deletion of what data types
  - Delayed deletion periods for different data categories
  - Legal/compliance hold scenarios
  - Backup retention after deletion
- [ ] What happens to data after account cancellation
  - Difference between cancellation and deletion
  - Data retention during inactive/cancelled state
  - Access to data after cancellation
  - Reactivation scenarios and data availability
- [ ] Data export capabilities (format, scope)
  - Data export formats (CSV, JSON, Excel, PDF)
  - Scope of export (all data vs specific modules)
  - Export includes: orders, products, expenses, reports, settings
  - Historical data depth in exports
- [ ] Bulk data export procedures
  - How to request full data export
  - Export generation time (minutes, hours, days)
  - Export file size limits
  - Export download methods (direct download, email link, cloud storage)
- [ ] Individual data deletion requests
  - Can users delete specific records without deleting entire account?
  - Order deletion, expense deletion, report deletion
  - Selective data retention options
- [ ] "Right to be forgotten" compliance
  - How to submit GDPR erasure requests
  - Response timeline (30 days per GDPR)
  - Exceptions to erasure (legal obligations, financial records)
  - Erasure confirmation process
- [ ] Data portability options
  - Machine-readable export formats (JSON, XML)
  - APIs for data extraction
  - Direct data transfer to other services
  - Data schema documentation for portability

**Questions to Answer:**
1. How long does account deletion take (immediate, 30 days, 90 days)?
2. Can users export all their data in machine-readable format (JSON/CSV)?
3. Is there a grace period where deleted accounts can be recovered?
4. What data is permanently deleted vs retained for legal/financial compliance?
5. Can users delete individual orders or expenses without deleting the account?
6. Does BeProfit provide an API for automated data export?
7. How are "right to be forgotten" requests handled?
8. What happens to integrated platform data (Shopify orders) upon deletion?

---

### GDPR & Privacy Compliance

**Expected Help Articles:**
- "BeProfit and GDPR compliance"
- "Privacy policy overview"
- "Cookie consent and tracking"
- "Data processing agreements"

**Key Areas to Document:**
- [ ] GDPR compliance statements
  - Explicit GDPR compliance claims
  - EU-US data transfer mechanisms (Privacy Shield successor, SCCs)
  - GDPR representative contact information
  - Compliance verification or certification
- [ ] Privacy policy links and references
  - Location of privacy policy (footer, settings, help center)
  - Last updated date of privacy policy
  - Privacy policy key highlights
  - Separate policies for different services (app, API, website)
- [ ] Cookie consent mechanisms
  - Cookie banner implementation
  - Cookie categories (essential, analytics, marketing)
  - Opt-in vs opt-out approach
  - Cookie preference management
  - Third-party cookies disclosure
- [ ] User consent management
  - Consent collection for data processing
  - Consent withdrawal process
  - Granular consent options (analytics, marketing, etc.)
  - Consent logs and audit trail
- [ ] Data processing agreements (DPAs)
  - DPA availability for customers
  - How to request/sign a DPA
  - DPA standard clauses and terms
  - Enterprise vs standard plan DPA differences
- [ ] Privacy Shield/Standard Contractual Clauses mentions
  - Use of Standard Contractual Clauses (SCCs) for EU data transfers
  - Reference to Schrems II decision impacts
  - Transfer impact assessments (TIAs)
- [ ] Data protection officer contact (if applicable)
  - DPO contact email or form
  - DPO responsibilities and scope
  - Privacy inquiry response times
- [ ] Privacy rights documentation (access, rectification, erasure, portability, objection)
  - **Right to Access:** How to request copy of personal data
  - **Right to Rectification:** How to correct inaccurate data
  - **Right to Erasure:** How to request deletion (see Data Deletion section)
  - **Right to Portability:** How to export data (see Data Export section)
  - **Right to Object:** How to object to data processing for marketing
  - **Right to Restriction:** How to request processing restriction
  - Response timelines for each right (typically 30 days per GDPR)

**Questions to Answer:**
1. Does BeProfit explicitly state GDPR compliance in help center?
2. Is there a dedicated privacy policy page or document?
3. Can EU customers opt out of analytics/marketing cookies?
4. Are Data Processing Agreements (DPAs) available for enterprise customers?
5. Does BeProfit have a designated Data Protection Officer (DPO)?
6. How does BeProfit handle EU-US data transfers post-Privacy Shield?
7. Can users exercise all GDPR rights (access, rectification, erasure, portability, objection)?
8. What is the response timeline for privacy rights requests (30 days)?

---

### Data Retention Policies

**Expected Help Articles:**
- "How long BeProfit retains your data"
- "Data retention policies by data type"
- "Financial record retention"
- "Backup and archival policies"

**Key Areas to Document:**
- [ ] Order data retention period
  - Active order data retention (while account is active)
  - Historical order data limits (3 years, 7 years, unlimited)
  - Order data retention after account cancellation
  - Deleted order recovery period
- [ ] Financial data retention requirements
  - Transaction data retention (tax compliance, auditing)
  - Invoice and receipt retention periods
  - Revenue and expense data retention
  - Payment method data retention
  - Legal/regulatory retention requirements (IRS 7 years, etc.)
- [ ] User activity logs retention
  - Login history retention period
  - Action logs (settings changes, exports, deletions)
  - Audit trail retention for compliance
  - Security event logs retention
- [ ] Integration data retention (ad spend, analytics)
  - Synced data from Shopify, WooCommerce, Amazon
  - Ad platform data (Facebook, Google, TikTok) retention
  - Analytics data (Google Analytics) retention
  - Retention after integration disconnection
- [ ] Archived vs active data policies
  - When data is moved to archival storage
  - Access to archived data (slower retrieval, search limitations)
  - Archival data retention periods
  - Cost differences for archived vs active data
- [ ] Backup retention timelines
  - Backup frequency (daily, weekly)
  - Backup retention period (30 days, 90 days, 1 year)
  - Point-in-time recovery capabilities
  - Backup deletion schedule after account deletion
- [ ] Legal hold procedures (if mentioned)
  - How legal holds are implemented
  - Notification to customers of legal hold
  - Data retention during litigation or investigation
  - Legal hold removal process
- [ ] Data retention differences by plan tier
  - Free/trial plan data retention limits
  - Starter plan retention periods
  - Growth plan retention periods
  - Enterprise plan retention (typically longest/unlimited)
  - Historical data access by plan tier

**Questions to Answer:**
1. How long are orders retained after account cancellation (30 days, 90 days, forever)?
2. Are there different retention periods for financial vs operational data?
3. Do higher-tier plans get longer data retention (e.g., 7 years vs 3 years)?
4. How long are backups retained after account deletion?
5. Is there a maximum historical data depth (e.g., "can only access last 3 years")?
6. What happens to data from disconnected integrations (Shopify, ads)?
7. Are activity logs retained indefinitely for audit purposes?
8. Can customers request extended data retention for compliance needs?

---

### Customer Data Access

**Expected Help Articles:**
- "Accessing your data in BeProfit"
- "Audit logs and activity history"
- "Data transparency and reporting"

**Key Areas to Document:**
- [ ] How customers can access their own data
  - Self-service data access (dashboard, settings, exports)
  - Data visibility in the app vs via export
  - API access to data
  - Support-assisted data access
- [ ] Data transparency reports or dashboards
  - Privacy dashboard showing data collected
  - Data usage transparency (what data is used for what purpose)
  - Third-party data sharing transparency
  - Data access logs (who accessed what, when)
- [ ] Audit logs availability
  - User activity logs (login, settings changes, exports)
  - Data modification logs (who changed what, when)
  - Admin action logs (user management, billing changes)
  - Integration sync logs
  - Audit log retention period
  - Audit log export capabilities
- [ ] Data lineage tracking
  - Source of data (which integration, which sync)
  - Data transformation history
  - Calculation audit trail (how profit was calculated)
  - Data correction history
- [ ] Change history for records
  - Order edit history
  - Expense modification history
  - Settings change history
  - User permission change history

**Questions to Answer:**
1. Can users see a complete audit log of their account activity?
2. Is there a data access dashboard showing what data BeProfit has collected?
3. Can users track where their data came from (Shopify, ads, manual entry)?
4. Are calculation methods transparent (how profit/ROAS is calculated)?
5. Can users see who on their team accessed or modified data?
6. Is there a change history for key records (orders, expenses)?
7. How far back do audit logs go (30 days, 1 year, forever)?
8. Can audit logs be exported for compliance reporting?

---

### Compliance Certifications

**Expected Help Articles:**
- "BeProfit security certifications"
- "Compliance and audit reports"
- "SOC 2 Type II certification"
- "ISO certifications"

**Key Areas to Document:**
- [ ] SOC 2 compliance
  - SOC 2 Type I or Type II certification
  - SOC 2 report availability (request process)
  - Audit firm and last audit date
  - Covered trust service criteria (security, availability, confidentiality)
- [ ] ISO certifications
  - ISO 27001 (Information Security Management)
  - ISO 27017 (Cloud Security)
  - ISO 27018 (Cloud Privacy)
  - Certification body and dates
- [ ] Industry-specific compliance (e-commerce standards)
  - PCI DSS compliance (if handling payment card data)
  - E-commerce industry best practices
  - Marketplace compliance (Shopify, Amazon requirements)
- [ ] Security audit schedules
  - Annual security audits
  - Quarterly vulnerability assessments
  - Continuous monitoring programs
  - Audit report availability
- [ ] Penetration testing mentions
  - Penetration testing frequency (annual, semi-annual)
  - Third-party security testing
  - Vulnerability disclosure program
  - Bug bounty program
  - Security testing scope (infrastructure, application, API)

**Questions to Answer:**
1. Does BeProfit have SOC 2 Type II certification?
2. Are SOC 2 reports available to customers (under NDA)?
3. Does BeProfit hold ISO 27001 or other ISO security certifications?
4. Is BeProfit PCI DSS compliant (if applicable)?
5. How often does BeProfit conduct security audits?
6. Does BeProfit have a third-party penetration testing program?
7. Is there a vulnerability disclosure or bug bounty program?
8. Can customers request compliance documentation for their audits?

---

## Summary of Research Questions

**Critical Questions:**
1. Does BeProfit explicitly state GDPR compliance?
2. Can users export all their data in machine-readable format?
3. How long after cancellation is data retained?
4. Are there differences in data handling between plan tiers?
5. What happens to integrated platform data (Shopify orders, ad spend)?
6. Is data deletion immediate or scheduled?
7. Do they maintain data processing agreements (DPAs) for enterprise?
8. Are there data residency options (US, EU, etc.)?

**Secondary Questions:**
9. What encryption standards are used (AES-256, TLS 1.3)?
10. Is there a Data Protection Officer (DPO) contact?
11. How long are backups retained after account deletion?
12. Are audit logs available to customers?
13. Does BeProfit have SOC 2 Type II certification?
14. Is there a vulnerability disclosure program?
15. Can users exercise all GDPR rights through self-service?

---

## Research Notes

**Data Sources to Check:**
- Help Center main page (https://help.runviably.com/beprofit)
- Help Center search for: "GDPR", "privacy", "data deletion", "export", "security", "compliance"
- Privacy Policy (usually linked in footer)
- Terms of Service
- Security page (if exists)
- Trust center or compliance page (if exists)

**Expected Documentation Depth:**
- Data management and privacy are typically well-documented for SaaS products due to legal requirements
- GDPR compliance documentation is mandatory for products serving EU customers
- SOC 2 and ISO certifications are common for enterprise-focused products
- Help center should have dedicated sections for data deletion, export, and privacy rights

**Research Challenges:**
- Some compliance details may be in legal documents rather than help center
- Technical security details may be limited for security reasons
- Data retention specifics may vary by plan tier
- DPAs and SOC 2 reports may require customer request rather than public availability

---

## Completion Checklist

- [ ] All "Key Areas to Document" sections reviewed and populated
- [ ] All "Questions to Answer" addressed with findings
- [ ] Source URLs documented for each finding
- [ ] Research date and status updated
- [ ] Cross-references to related files (051, 052, 053, 054, 056, 057) added if applicable
- [ ] Ambiguities or gaps in documentation noted
- [ ] File marked as "RESEARCHED" instead of "TEMPLATE" when complete

---

**File Status:** ⚠️ TEMPLATE - Ready for manual research
**Expected Completion Time:** 3-4 hours of thorough help center exploration
**Next Steps:** Visit https://help.runviably.com/beprofit and systematically document findings in each section above
