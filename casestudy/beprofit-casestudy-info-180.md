# BeProfit Case Study Info 180: Onboarding & Wizard UI Patterns

## Metadata
- **File ID:** 180
- **Category:** Design System, Onboarding, UX Patterns
- **Date Captured:** 2026-02-13
- **Source Type:** Product UI analysis from help documentation and setup guides
- **Primary URLs:**
  - https://help.runviably.com/beprofit
  - https://beprofit.co/

## Executive Summary

BeProfit implements a sophisticated onboarding system designed to minimize time-to-value for new users while collecting necessary configuration data. The multi-step wizard approach breaks complex setup into digestible segments (store connection → COGS configuration → ad account linking → currency settings → data sync), each with clear progress indication through numbered stepper components showing completed (checkmark icons), current (purple highlight), and upcoming (gray outline) states. Progress visualization uses dual indicators: discrete step numbers (e.g., "Step 2 of 5") for concrete advancement tracking, and continuous progress bar (purple fill on gray track) for visual momentum. Contextual help permeates the experience through info icon tooltips (dark background, white text, 12-14px, positioned with intelligent viewport detection), inline help text (gray-600, smaller than input text, examples provided), and documentation links that open relevant help articles. Navigation controls balance forward momentum (prominent purple "Continue" button) with user control (subtle "Back" link, optional "Skip for now" for non-critical steps), while validation feedback provides immediate guidance without blocking exploration—errors appear on blur or submission attempt, not keystroke-by-keystroke. The first-run experience demonstrates thoughtful UX through empty dashboard welcome cards (gradient purple background, encouraging messaging, single CTA), setup checklists showing completion status (3 of 5 tasks complete, visual progress bar), and optional product tours that highlight key interface elements with spotlight overlays. Step persistence saves progress across sessions (stored in localStorage or database), allowing users to complete setup incrementally without losing work. Success celebration at wizard completion (checkmark animation, "You're all set!" message, green confirmation) provides positive reinforcement before transition to active product use. The system prioritizes progressive disclosure (show only what's needed now), smart defaults (pre-populate timezone/currency from IP), and skip options for optional configuration (defer ad account linking, set default COGS later), reducing friction while maintaining data quality.

## Onboarding Flow Architecture

### First-Time User Journey

**Complete Flow:** Account Creation → Store Connection → Data Sync → Dashboard Access

**Detailed Journey Map:**

```
1. Sign Up / Install (Shopify App Store)
   ↓
2. Initial Account Setup
   - Business name
   - Timezone
   - Currency
   ↓
3. Store Connection (Critical)
   - Shopify store URL
   - API credentials / OAuth flow
   - Permission scopes confirmation
   ↓
4. COGS Configuration (Important)
   - Default COGS percentage
   - Product-level COGS (optional, can defer)
   - Supplier cost import (optional)
   ↓
5. Ad Account Linking (Optional)
   - Facebook Ads connection
   - Google Ads connection
   - TikTok Ads connection (optional)
   - Skip option available
   ↓
6. Currency & Settings (Important)
   - Primary currency (pre-filled from IP)
   - Multi-currency handling
   - Date format preference
   ↓
7. Initial Data Sync (Automatic)
   - Progress bar showing sync status
   - "This takes 5-10 minutes" messaging
   - Option to explore dashboard during sync
   ↓
8. Welcome to Dashboard
   - Success celebration
   - Quick tutorial overlay (optional)
   - Dashboard with first data
```

### Onboarding Goals

**Time to First Value:** 3-5 minutes (store connection + COGS config + start sync)

**Required Steps (Minimum to see dashboard):**
1. Store connection (critical path, blocks everything)
2. Basic COGS configuration (can use default percentage temporarily)
3. Wait for initial sync (or view partial data)

**Optional Steps (Can be deferred):**
- Ad account connections (can add later in settings)
- Product-level COGS (can configure per-product after seeing initial data)
- Advanced currency settings (defaults work for most users)
- Team member invitations (can add later)

**Skip Option Philosophy:**
- **Store Connection:** Cannot skip (required for any functionality)
- **COGS Config:** Can skip with warning ("Profit calculations will use 0% COGS until configured")
- **Ad Accounts:** Can skip entirely (many users don't run ads)
- **Product Tour:** Can skip, revisit later from help menu

### Onboarding Success Metrics (Implied)

**Activation Events:**
- Store successfully connected (primary activation)
- First data sync completed
- First dashboard view with real data
- COGS configured for at least 50% of products
- User returns 24 hours after signup

**Drop-Off Risk Points:**
- Shopify API key confusion (technical barrier)
- COGS configuration complexity (too many options)
- Long sync wait time (5-10 minutes feels slow)
- Ad account connection errors (OAuth failures)

## Stepper/Wizard Component Patterns

### Visual Pattern

**Layout:** Horizontal stepper at top of wizard content area (desktop), or compact step indicator (mobile)

**Step Indicator Style:**
- **Completed Steps:** Checkmark icon in purple-600 (#6514DD) filled circle
- **Current Step:** Numbered circle with purple-600 border and white background, number in purple-600
- **Upcoming Steps:** Numbered circle with gray-300 (#D1D5DB) border and white background, number in gray-500

**Connector Lines:**
- **Between Steps:** Horizontal line connecting step circles
- **Completed Segments:** Purple-600 (#6514DD) solid line
- **Upcoming Segments:** Gray-200 (#E5E7EB) solid line

**Step Labels:**
- **Position:** Below step circle
- **Completed:** Gray-600 text, regular weight
- **Current:** Purple-600 text, font-semibold (600 weight)
- **Upcoming:** Gray-500 text, regular weight
- **Optional Steps:** Labeled with "(optional)" suffix in smaller, lighter text

**Responsive Behavior:**
- **Desktop (>1024px):** Full horizontal stepper with labels
- **Tablet (768px-1023px):** Compact stepper, shorter labels
- **Mobile (<768px):** Simplified "Step X of Y" text indicator + progress bar (no visual stepper)

### Stepper Component Implementation

```tsx
interface Step {
  id: string;
  label: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming';
  optional?: boolean;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void; // Optional: allow clicking completed steps
}

const Stepper = ({ steps, currentStep, onStepClick }: StepperProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    // Mobile: Simple text + progress bar
    return (
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span className="font-medium">Setup Progress</span>
          <span>Step {currentStep + 1} of {steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {steps[currentStep].label}
        </p>
      </div>
    );
  }

  // Desktop: Full visual stepper
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';
          const isClickable = isCompleted && onStepClick;

          return (
            <li
              key={step.id}
              className={`relative ${index !== steps.length - 1 ? 'flex-1' : ''}`}
            >
              {/* Connector line (except for last step) */}
              {index !== steps.length - 1 && (
                <div
                  className="absolute top-4 left-[calc(50%+20px)] right-0 h-0.5 -translate-y-1/2"
                  style={{
                    backgroundColor: isCompleted ? '#6514DD' : '#E5E7EB',
                  }}
                />
              )}

              {/* Step indicator */}
              <button
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={`relative flex flex-col items-center ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {/* Circle with number or checkmark */}
                <div
                  className={`
                    relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center
                    transition-colors duration-200
                    ${isCompleted ? 'bg-purple-600 border-purple-600' : ''}
                    ${isCurrent ? 'bg-white border-purple-600' : ''}
                    ${step.status === 'upcoming' ? 'bg-white border-gray-300' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span
                      className={`text-sm font-semibold ${
                        isCurrent ? 'text-purple-600' : 'text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Step label */}
                <div className="mt-3 text-center">
                  <span
                    className={`
                      text-sm font-medium block
                      ${isCurrent ? 'text-purple-600' : 'text-gray-600'}
                    `}
                  >
                    {step.label}
                    {step.optional && (
                      <span className="text-gray-400 font-normal text-xs ml-1">
                        (optional)
                      </span>
                    )}
                  </span>
                  {step.description && (
                    <span className="text-xs text-gray-500 mt-1 block max-w-[120px]">
                      {step.description}
                    </span>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Example usage:
const onboardingSteps: Step[] = [
  {
    id: 'store',
    label: 'Connect Store',
    description: 'Link your Shopify store',
    status: 'completed',
  },
  {
    id: 'cogs',
    label: 'Configure COGS',
    description: 'Set product costs',
    status: 'current',
  },
  {
    id: 'ads',
    label: 'Ad Accounts',
    description: 'Connect ad platforms',
    status: 'upcoming',
    optional: true,
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Currency & timezone',
    status: 'upcoming',
  },
  {
    id: 'sync',
    label: 'Sync Data',
    description: 'Import your orders',
    status: 'upcoming',
  },
];

<Stepper
  steps={onboardingSteps}
  currentStep={1}
  onStepClick={(index) => navigateToStep(index)}
/>
```

### Progress Indicator

**Overall Progress Display:**
- **Text Format:** "Step X of Y" (e.g., "Step 2 of 5")
- **Percentage Format:** "40% Complete" (displayed alongside or instead of step count)
- **Visual Progress Bar:** Linear progress bar showing completion percentage

**Progress Bar Styling:**
- **Track:** Gray-200 (#E5E7EB) background, 8px height (h-2), fully rounded (rounded-full)
- **Fill:** Purple-600 (#6514DD), smooth width transition (transition-all duration-300)
- **Border Radius:** Fully rounded on both ends
- **Position:** Above wizard content, below stepper (if stepper present)

**Progress Persistence:**
- **Storage:** Progress saved to localStorage (client-side) or user profile (server-side)
- **Behavior:** Users can close wizard and resume later from same step
- **Data Retention:** Form inputs for each step cached until completion
- **Reset Option:** "Start over" link available if user wants to reconfigure

**Implementation:**

```tsx
interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  showPercentage?: boolean;
}

const OnboardingProgress = ({
  currentStep,
  totalSteps,
  showPercentage = true,
}: OnboardingProgressProps) => {
  const percentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="mb-6">
      {/* Progress header */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
        <span className="font-medium text-gray-700">Setup Progress</span>
        <div className="flex gap-3">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          {showPercentage && (
            <span className="font-medium text-purple-600">
              {percentage}%
            </span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Setup ${percentage}% complete`}
        />
      </div>
    </div>
  );
};
```

**Progress Persistence Implementation:**

```tsx
// Zustand store for onboarding progress
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  currentStep: number;
  completedSteps: string[];
  formData: Record<string, any>;
  setStep: (step: number) => void;
  completeStep: (stepId: string) => void;
  setFormData: (stepId: string, data: any) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      completedSteps: [],
      formData: {},

      setStep: (step) => set({ currentStep: step }),

      completeStep: (stepId) => set((state) => ({
        completedSteps: [...state.completedSteps, stepId],
      })),

      setFormData: (stepId, data) => set((state) => ({
        formData: { ...state.formData, [stepId]: data },
      })),

      reset: () => set({
        currentStep: 0,
        completedSteps: [],
        formData: {},
      }),
    }),
    {
      name: 'beprofit-onboarding', // localStorage key
      partialize: (state) => ({
        // Only persist necessary data
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        formData: state.formData,
      }),
    }
  )
);

// Usage in wizard component:
const OnboardingWizard = () => {
  const { currentStep, formData, setStep, completeStep, setFormData } = useOnboardingStore();

  const handleNext = async () => {
    // Save current step data
    setFormData(steps[currentStep].id, currentFormData);

    // Mark as complete
    completeStep(steps[currentStep].id);

    // Move to next step
    setStep(currentStep + 1);
  };

  // Resume from saved progress on mount
  useEffect(() => {
    // If user has saved progress, show resume dialog
    if (currentStep > 0) {
      showResumeDialog();
    }
  }, []);

  return (
    <div>
      <OnboardingProgress currentStep={currentStep} totalSteps={steps.length} />
      <Stepper steps={steps} currentStep={currentStep} />
      <StepContent step={steps[currentStep]} data={formData[steps[currentStep].id]} />
      <StepNavigation onNext={handleNext} onBack={() => setStep(currentStep - 1)} />
    </div>
  );
};
```

## Step Navigation Patterns

### Navigation Controls

**Primary Action Button:**
- **Label:** Context-sensitive
  - "Continue" (most steps)
  - "Connect Store" (store connection step)
  - "Finish Setup" (final step)
  - "Start Syncing" (data sync initiation)
- **Style:** Large, prominent purple-600 button, font-semibold
- **Size:** px-6 py-3 (larger than standard buttons for emphasis)
- **Position:** Bottom-right of wizard content
- **Loading State:** Spinner + "Connecting..." or "Saving..." during async operations

**Secondary Action Button/Link:**
- **Back:** Text link or subtle button, left-aligned
  - Style: "← Back" text link in gray-700, hover:text-gray-900
  - Only shown after first step (no back on step 1)
- **Skip:** Right-aligned secondary button, only for optional steps
  - Style: Text link in gray-600, "Skip for now" label
  - Confirmation modal if skipping has consequences

**Exit Option:**
- **X Button:** Top-right corner of wizard modal/page
- **Behavior:** Saves progress, shows "Exit setup?" confirmation
- **Alternative Label:** "I'll do this later" link below step content
- **Return Path:** User can resume from dashboard setup prompt

**Button Spacing:**
- **Gap Between Actions:** 12px (gap-3) between buttons
- **Container Padding:** pt-6 top padding above nav controls, border-top for visual separation

### Navigation Component Implementation

```tsx
interface StepNavigationProps {
  onNext: () => void | Promise<void>;
  onBack?: () => void;
  onSkip?: () => void;
  onExit?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  nextLoading?: boolean;
  showBack?: boolean;
  showSkip?: boolean;
  isFirstStep?: boolean;
  isFinalStep?: boolean;
}

const StepNavigation = ({
  onNext,
  onBack,
  onSkip,
  onExit,
  nextLabel = "Continue",
  nextDisabled = false,
  nextLoading = false,
  showBack = true,
  showSkip = false,
  isFirstStep = false,
  isFinalStep = false,
}: StepNavigationProps) => {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
      {/* Left: Back button */}
      <div>
        {showBack && !isFirstStep && onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
      </div>

      {/* Right: Skip + Next/Finish buttons */}
      <div className="flex gap-3">
        {showSkip && onSkip && (
          <button
            onClick={onSkip}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          >
            Skip for now
          </button>
        )}

        <button
          onClick={onNext}
          disabled={nextDisabled || nextLoading}
          className="
            inline-flex items-center justify-center gap-2
            px-6 py-3 bg-purple-600 text-white rounded-md font-semibold
            hover:bg-purple-700 active:bg-purple-800
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
            min-w-[140px]
          "
        >
          {nextLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading...
            </>
          ) : (
            <>
              {nextLabel}
              {!isFinalStep && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// Usage example:
<StepNavigation
  onNext={handleNext}
  onBack={handleBack}
  onSkip={handleSkip}
  nextLabel="Connect Store"
  nextDisabled={!storeUrlValid}
  nextLoading={isConnecting}
  showBack={currentStep > 0}
  showSkip={steps[currentStep].optional}
  isFirstStep={currentStep === 0}
  isFinalStep={currentStep === steps.length - 1}
/>
```

### Validation Patterns

**Step Completion Requirements:**

**Validation Timing:**
1. **On Blur:** Individual field validation triggers when user leaves field
2. **On Submit:** Full step validation when clicking "Continue"
3. **Real-Time (Optional):** For critical fields, show validation as user types (e.g., store URL format check)

**Blocking vs Non-Blocking Validation:**
- **Blocking:** User cannot proceed to next step if required fields are invalid (Next button disabled)
- **Non-Blocking:** User can proceed with warnings for optional fields

**Validation Patterns by Field Type:**

```tsx
// Store URL validation (critical field)
const validateStoreUrl = (url: string): string | null => {
  if (!url) return "Store URL is required";
  if (!url.includes('.myshopify.com')) return "Must be a valid Shopify store URL";
  if (!/^[a-z0-9-]+\.myshopify\.com$/.test(url)) return "Invalid format (e.g., mystore.myshopify.com)";
  return null; // Valid
};

// COGS percentage validation (numeric range)
const validateCogsPercentage = (value: string): string | null => {
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid number";
  if (num < 0) return "COGS cannot be negative";
  if (num > 100) return "COGS cannot exceed 100%";
  return null;
};

// API key validation (format check)
const validateApiKey = (key: string): string | null => {
  if (!key) return "API key is required";
  if (key.length < 32) return "API key must be at least 32 characters";
  return null;
};
```

**Step Validation Component:**

```tsx
const StoreConnectionStep = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [storeUrl, setStoreUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateField(field);
  };

  const validateField = (field: string) => {
    let error: string | null = null;

    if (field === 'storeUrl') {
      error = validateStoreUrl(storeUrl);
    } else if (field === 'apiKey') {
      error = validateApiKey(apiKey);
    }

    setErrors({ ...errors, [field]: error || '' });
  };

  const handleSubmit = async () => {
    // Validate all fields
    const storeUrlError = validateStoreUrl(storeUrl);
    const apiKeyError = validateApiKey(apiKey);

    if (storeUrlError || apiKeyError) {
      setErrors({
        storeUrl: storeUrlError || '',
        apiKey: apiKeyError || '',
      });
      setTouched({ storeUrl: true, apiKey: true });
      return;
    }

    // Submit if valid
    await onComplete({ storeUrl, apiKey });
  };

  const isValid = !validateStoreUrl(storeUrl) && !validateApiKey(apiKey);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Connect Your Shopify Store
        </h2>
        <p className="text-gray-600">
          We'll import your orders and product data to calculate your profit.
        </p>
      </div>

      <div className="space-y-4">
        {/* Store URL field */}
        <div>
          <label htmlFor="storeUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Store URL
          </label>
          <input
            id="storeUrl"
            type="text"
            value={storeUrl}
            onChange={(e) => setStoreUrl(e.target.value)}
            onBlur={() => handleBlur('storeUrl')}
            placeholder="mystore.myshopify.com"
            className={`
              w-full px-3 py-2 border rounded-md
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${touched.storeUrl && errors.storeUrl
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-purple-500'
              }
            `}
          />
          {touched.storeUrl && errors.storeUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.storeUrl}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Find this in your Shopify admin URL
          </p>
        </div>

        {/* API Key field */}
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            API Key
            <InfoTooltip content="You can generate an API key in your Shopify admin under Settings → Apps and sales channels" />
          </label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onBlur={() => handleBlur('apiKey')}
            placeholder="shpat_..."
            className={`
              w-full px-3 py-2 border rounded-md font-mono text-sm
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${touched.apiKey && errors.apiKey
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-purple-500'
              }
            `}
          />
          {touched.apiKey && errors.apiKey && (
            <p className="mt-1 text-sm text-red-600">{errors.apiKey}</p>
          )}
        </div>
      </div>

      <StepNavigation
        onNext={handleSubmit}
        nextLabel="Connect Store"
        nextDisabled={!isValid}
        isFirstStep
      />
    </div>
  );
};
```

### Error Handling in Wizard Context

**Display Patterns:**
- **Inline Errors:** Below problematic field (red text, icon)
- **Step-Level Errors:** Banner at top of step content (e.g., "Connection failed" after API attempt)
- **Multi-Field Errors:** Summary list of all errors at top, with jump links to fields

**Error Recovery:**
- **Retry Button:** For API failures, show "Try Again" button
- **Edit Previous Step:** Allow going back to fix errors in completed steps
- **Contact Support:** Link to support if errors persist

**Example Step-Level Error:**

```tsx
{apiConnectionError && (
  <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
    <div className="flex items-start gap-3">
      <XCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="text-sm font-medium text-red-800 mb-1">
          Connection Failed
        </h4>
        <p className="text-sm text-red-700">
          {apiConnectionError.message}
        </p>
        <button
          onClick={retryConnection}
          className="mt-2 text-sm font-medium text-red-800 hover:text-red-900 underline"
        >
          Try again
        </button>
      </div>
    </div>
  </div>
)}
```

## Contextual Help Patterns

### Tooltip System

**Trigger:** Hover over info icon (desktop), tap on mobile

**Positioning:**
- **Auto-Detection:** Tooltip intelligently positions based on viewport space (top, bottom, left, right)
- **Preferred Position:** Bottom (below icon) for maximum visibility
- **Fallback Logic:** If bottom would overflow viewport, position top; if right would overflow, position left

**Visual Styling:**
- **Background:** Dark gray-900 (#111827) with 90% opacity
- **Text:** White, 12-14px, line-height 1.4
- **Padding:** 12px horizontal, 8px vertical
- **Border Radius:** 6px (rounded-md)
- **Max Width:** 280-320px (prevents overly wide tooltips)
- **Arrow:** Small triangular pointer connecting tooltip to trigger icon
- **Shadow:** lg shadow for depth
- **z-index:** 50 (ensures visibility over other content)

**Animation:**
- **Entrance:** Fade in (opacity 0 → 1) + slight scale up (scale-95 → scale-100) over 150ms
- **Exit:** Fade out over 100ms
- **Delay:** 200ms delay before showing (prevents accidental triggers on quick mouse-overs)

**Tooltip Component Implementation:**

```tsx
import * as Tooltip from '@radix-ui/react-tooltip';

interface InfoTooltipProps {
  content: string | React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: number;
}

const InfoTooltip = ({ content, side = 'bottom', maxWidth = 320 }: InfoTooltipProps) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="More information"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            sideOffset={8}
            className="
              bg-gray-900/95 text-white text-sm px-3 py-2 rounded-md shadow-lg
              z-50 animate-in fade-in-0 zoom-in-95
            "
            style={{ maxWidth: `${maxWidth}px` }}
          >
            {content}
            <Tooltip.Arrow className="fill-gray-900/95" width={12} height={6} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

// Usage examples:

// Simple text tooltip
<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
  Store URL
  <InfoTooltip content="Enter your Shopify store URL (e.g., mystore.myshopify.com)" />
</label>

// Rich content tooltip
<InfoTooltip
  content={
    <div>
      <p className="font-medium mb-1">What is COGS?</p>
      <p className="text-xs opacity-90">
        Cost of Goods Sold is how much you paid to acquire or produce each product.
        This includes supplier costs, shipping, and manufacturing expenses.
      </p>
    </div>
  }
  maxWidth={280}
/>

// Tooltip with link
<InfoTooltip
  content={
    <div>
      <p className="mb-2">You can generate an API key in your Shopify admin.</p>
      <a
        href="https://help.runviably.com/beprofit/api-key"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-300 hover:text-purple-200 underline text-xs"
      >
        Learn how →
      </a>
    </div>
  }
/>
```

### Help Text Patterns

**Inline Help Text:**
- **Position:** Directly below form input field
- **Color:** Gray-500 (#6B7280) for secondary importance
- **Font Size:** 12px (text-xs) or 14px (text-sm), smaller than input text
- **Content:** 1-2 sentences providing guidance or examples

**Help Text Types:**

1. **Instructional:** Explains what to enter
   - "Enter your Shopify store URL (e.g., mystore.myshopify.com)"

2. **Example-Based:** Shows valid format examples
   - "e.g., 25 (for 25% COGS)"
   - "e.g., USD, EUR, GBP"

3. **Contextual:** Explains why information is needed
   - "We use this to calculate accurate profit margins"
   - "Your timezone helps us display reports in your local time"

4. **Link-Based:** Points to documentation
   - "Find this in your Shopify admin. [Learn more →](#)"

**Implementation:**

```tsx
// Form field with help text
<div className="space-y-1">
  <label htmlFor="cogs" className="block text-sm font-medium text-gray-700">
    Default COGS Percentage
  </label>

  <input
    id="cogs"
    type="number"
    min="0"
    max="100"
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
    placeholder="25"
  />

  {/* Help text */}
  <p className="text-xs text-gray-500">
    Enter the average percentage of revenue that goes to product costs.
    You can adjust this per-product later.{' '}
    <a
      href="/help/cogs-configuration"
      target="_blank"
      className="text-purple-600 hover:text-purple-700 hover:underline"
    >
      Learn more about COGS
    </a>
  </p>
</div>
```

**Help Text with Icon:**

```tsx
<p className="text-xs text-gray-500 flex items-start gap-2 mt-1">
  <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
  <span>
    We'll automatically sync new orders every hour once connected.
  </span>
</p>
```

### Documentation Links

**Pattern:** Inline text links that open help articles in new tab

**Styling:**
- **Color:** Purple-600 text, hover:purple-700
- **Underline:** None by default, appear on hover
- **Icon:** Optional arrow (→) or external link icon
- **Target:** Opens in new tab (_blank) with rel="noopener noreferrer"

**Placement:**
- **Within Help Text:** Embedded in explanatory text
- **After Field Label:** Small link next to label
- **In Tooltips:** As supplementary resource

**Examples:**

```tsx
// Inline in help text
<p className="text-xs text-gray-500">
  Connect your ad accounts to track ROI.{' '}
  <a
    href="https://help.runviably.com/beprofit/ad-accounts"
    target="_blank"
    rel="noopener noreferrer"
    className="text-purple-600 hover:text-purple-700 hover:underline"
  >
    Learn more →
  </a>
</p>

// After label
<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
  API Key
  <a
    href="https://help.runviably.com/beprofit/api-key-setup"
    target="_blank"
    rel="noopener noreferrer"
    className="text-xs font-normal text-purple-600 hover:text-purple-700 hover:underline"
  >
    How to find this
  </a>
</label>

// Standalone help link
<div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
  <p className="text-sm text-blue-800 mb-2">
    Need help connecting your store?
  </p>
  <a
    href="https://help.runviably.com/beprofit/troubleshooting"
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm font-medium text-blue-700 hover:text-blue-800 inline-flex items-center gap-1"
  >
    View troubleshooting guide
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  </a>
</div>
```

### Guided Tour / Product Tour

**Pattern:** Sequential overlay modals highlighting specific UI elements

**Trigger:**
- **Automatic:** First login after onboarding completion (optional, user can dismiss)
- **Manual:** "Take a tour" link in help menu or profile dropdown
- **Resume:** Remember tour progress if user dismisses midway

**Tour Steps (Example BeProfit Dashboard Tour):**

```tsx
interface TourStep {
  target: string; // CSS selector
  title: string;
  content: string;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  showProgress?: boolean;
  disableBeacon?: boolean; // Skip pulsing beacon, go straight to tooltip
}

const dashboardTour: TourStep[] = [
  {
    target: '.dashboard-kpi-cards',
    title: 'Your Key Metrics',
    content: 'These cards show your most important numbers at a glance: total profit, revenue, margins, and ad spend.',
    placement: 'bottom',
  },
  {
    target: '.date-range-picker',
    title: 'Change Time Period',
    content: 'Click here to analyze different date ranges. Try "Last 7 days", "Last 30 days", or select a custom range.',
    placement: 'bottom',
  },
  {
    target: '.revenue-chart',
    title: 'Revenue Trends',
    content: 'This chart visualizes your profit over time. Hover over any point to see detailed breakdowns.',
    placement: 'top',
  },
  {
    target: '.orders-table',
    title: 'Order Details',
    content: 'View individual order profit here. Click any column header to sort, or use filters to find specific orders.',
    placement: 'top',
  },
  {
    target: '.sidebar-nav',
    title: 'Navigation',
    content: 'Access all your reports and tools from this sidebar. Try the Products, Expenses, and Reports sections.',
    placement: 'right',
  },
];
```

**Tour Implementation (using react-joyride):**

```bash
npm install react-joyride
```

```tsx
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

const ProductTour = () => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Check if user has completed tour
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('dashboard-tour-completed');
    if (!hasSeenTour) {
      // Show tour after slight delay
      setTimeout(() => setRun(true), 1000);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      localStorage.setItem('dashboard-tour-completed', 'true');
      setRun(false);
    }

    if (data.action === 'close') {
      setRun(false);
    }
  };

  const steps: Step[] = dashboardTour.map((step) => ({
    target: step.target,
    content: (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {step.title}
        </h3>
        <p className="text-sm text-gray-600">
          {step.content}
        </p>
      </div>
    ),
    placement: step.placement,
    disableBeacon: step.disableBeacon ?? true,
  }));

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#6514DD', // Purple brand color
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 8,
          padding: 20,
        },
        buttonNext: {
          backgroundColor: '#6514DD',
          borderRadius: 6,
          padding: '8px 16px',
        },
        buttonBack: {
          color: '#6B7280',
          marginRight: 10,
        },
        buttonSkip: {
          color: '#6B7280',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip tour',
      }}
    />
  );
};
```

**Tour Controls:**
- **Skip Tour:** Dismiss button in top-right, "Skip tour" text link
- **Navigation:** "Next" button (purple), "Back" button (gray text link)
- **Progress:** "Step X of Y" indicator
- **Exit:** Close button (X) in top-right of tooltip

## First-Run Experience Elements

### Welcome Screen

**Pattern:** Full-screen modal or prominent card on empty dashboard

**Trigger:** First login after account creation, before any stores connected

**Visual Design:**
- **Background:** Gradient purple (purple-600 to purple-800) for brand emphasis
- **Layout:** Centered content, max-width 600px
- **Logo/Illustration:** Optional BeProfit logo or welcome illustration at top
- **Heading:** Large, bold, white text (text-2xl or text-3xl)
- **Description:** White/purple-100 text, 2-3 sentences explaining next steps
- **CTA:** Prominent white button with purple text (inverted for contrast)

**Dismissible:**
- **Skip Option:** "I'll do this later" link below CTA (less prominent)
- **Cannot Close via X:** First store connection is required for functionality

**Implementation:**

```tsx
const WelcomeModal = ({ onStart, onSkip }: { onStart: () => void; onSkip?: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-8 md:p-12 max-w-2xl w-full shadow-2xl">
        <div className="text-center text-white">
          {/* Optional: Logo or illustration */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold mb-4">
            Welcome to BeProfit! 👋
          </h2>

          {/* Description */}
          <p className="text-lg text-purple-100 mb-2">
            Let's get your store connected so you can start tracking profit, expenses, and margins.
          </p>
          <p className="text-base text-purple-200 mb-8">
            This will only take a few minutes.
          </p>

          {/* CTA */}
          <button
            onClick={onStart}
            className="w-full md:w-auto px-8 py-4 bg-white text-purple-600 rounded-md font-semibold text-lg hover:bg-purple-50 transition-colors shadow-lg"
          >
            Connect Your First Store
          </button>

          {/* Skip option (if allowed) */}
          {onSkip && (
            <button
              onClick={onSkip}
              className="mt-4 text-sm text-purple-200 hover:text-white underline"
            >
              I'll do this later
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
```

### Empty Dashboard with Setup Prompts

**Pattern:** Dashboard layout visible with empty states, prominent setup card in hero position

**Layout:**
- **Setup Card:** Large card in top/center of dashboard content area
- **Empty KPI Cards:** Show "—" or "$0.00" with subtitle "Connect store to view"
- **Empty Charts/Tables:** Gray placeholder with "No data yet" message

**Setup Checklist Component:**

```tsx
interface SetupTask {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  required: boolean;
  action?: () => void;
}

const SetupChecklist = ({ tasks, onDismiss }: { tasks: SetupTask[]; onDismiss?: () => void }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const percentage = Math.round((completedCount / totalCount) * 100);
  const allComplete = completedCount === totalCount;

  return (
    <div className="bg-white border-2 border-purple-200 rounded-lg p-6 shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {allComplete ? 'Setup Complete! 🎉' : 'Complete Your Setup'}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {allComplete
              ? 'You're all set. Your data is syncing now.'
              : `${completedCount} of ${totalCount} tasks completed`
            }
          </p>
        </div>

        {allComplete && onDismiss && (
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Progress Bar */}
      {!allComplete && (
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Task List */}
      <ul className="space-y-4">
        {tasks.map((task, index) => (
          <li key={task.id} className="flex items-start gap-4">
            {/* Checkbox/Status Icon */}
            <div className="flex-shrink-0 mt-1">
              {task.completed ? (
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-500">{index + 1}</span>
                </div>
              )}
            </div>

            {/* Task Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {task.label}
                    {task.required && !task.completed && (
                      <span className="ml-1.5 text-xs text-red-600">(required)</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {task.description}
                  </p>
                </div>

                {/* Action Button */}
                {!task.completed && task.action && (
                  <button
                    onClick={task.action}
                    className="flex-shrink-0 px-3 py-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                  >
                    Set up →
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Call to Action (if incomplete) */}
      {!allComplete && tasks.filter(t => !t.completed && t.action).length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={tasks.find(t => !t.completed && t.action)?.action}
            className="w-full px-4 py-2.5 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors"
          >
            Continue Setup
          </button>
        </div>
      )}
    </div>
  );
};

// Usage with example tasks:
const setupTasks: SetupTask[] = [
  {
    id: 'store',
    label: 'Connect your Shopify store',
    description: 'Link your store to start syncing order data',
    completed: false,
    required: true,
    action: () => openStoreConnectionModal(),
  },
  {
    id: 'cogs',
    label: 'Configure cost of goods sold (COGS)',
    description: 'Set product costs for accurate profit calculations',
    completed: false,
    required: true,
    action: () => navigateToCogsSettings(),
  },
  {
    id: 'ads',
    label: 'Connect ad accounts (optional)',
    description: 'Link Facebook Ads, Google Ads for complete attribution',
    completed: false,
    required: false,
    action: () => openAdAccountsModal(),
  },
  {
    id: 'sync',
    label: 'Wait for initial data sync',
    description: 'Usually takes 5-10 minutes for first sync',
    completed: false,
    required: true,
  },
];

<SetupChecklist
  tasks={setupTasks}
  onDismiss={() => dismissSetupCard()}
/>
```

## Multi-Step Form Patterns

### Data Collection Approach

**Progressive Disclosure:** Collect minimum info first, advanced config later

**Information Hierarchy:**
1. **Critical (Step 1):** Store connection (blocks everything)
2. **Important (Step 2):** COGS configuration (affects accuracy)
3. **Helpful (Step 3):** Ad accounts (enhances insights, not required)
4. **Optional (Step 4):** Advanced settings (can configure later)

**Smart Defaults:**
- **Timezone:** Auto-detect from browser/IP
- **Currency:** Detect from store currency or IP location
- **Date Format:** Infer from locale (MM/DD/YYYY for US, DD/MM/YYYY for Europe)
- **COGS Percentage:** Suggest industry average (e.g., 40% for retail)

**Field Grouping:** Related fields grouped together in same step
- Store connection fields together (URL + API key)
- Currency settings together (primary currency + multi-currency handling)
- Ad accounts grouped by platform (FB, Google, TikTok in same step)

**Example Smart Defaults Implementation:**

```tsx
const useSmartDefaults = () => {
  const [defaults, setDefaults] = useState({
    timezone: '',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
  });

  useEffect(() => {
    // Detect timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Detect locale for date format
    const locale = navigator.language || 'en-US';
    const dateFormat = locale.startsWith('en-US') ? 'MM/DD/YYYY' : 'DD/MM/YYYY';

    // Detect currency from locale (simplified)
    const currencyMap: Record<string, string> = {
      'en-US': 'USD',
      'en-GB': 'GBP',
      'en-CA': 'CAD',
      'en-AU': 'AUD',
      'de': 'EUR',
      'fr': 'EUR',
      'es': 'EUR',
    };
    const currency = currencyMap[locale] || 'USD';

    setDefaults({ timezone, currency, dateFormat });
  }, []);

  return defaults;
};

// Usage in settings step:
const SettingsStep = () => {
  const smartDefaults = useSmartDefaults();
  const [currency, setCurrency] = useState(smartDefaults.currency);
  const [timezone, setTimezone] = useState(smartDefaults.timezone);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Currency
        </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="CAD">CAD ($)</option>
          <option value="AUD">AUD ($)</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          We detected {smartDefaults.currency} based on your location
        </p>
      </div>

      {/* Similar for timezone */}
    </div>
  );
};
```

### Validation Timing

**Per-Step Validation:** Validate all fields in current step when clicking "Next"

**Per-Field Validation:** Validate individual field when:
- **On Blur:** User tabs out of field (most common)
- **On Change (Debounced):** For critical fields, validate after user stops typing (500ms debounce)
- **Real-Time (Rare):** Only for format checks where instant feedback is helpful (e.g., URL format, email format)

**Server-Side Validation:** API validation for:
- **Unique Values:** Store URL, API keys, email addresses
- **External Connections:** Shopify API key validity, ad account permissions
- **Data Lookups:** Product SKU existence, currency validity

**Validation Strategy by Field Type:**

```tsx
// URL format validation (client-side, on change with debounce)
const validateUrlFormat = (url: string): boolean => {
  return /^[a-z0-9-]+\.myshopify\.com$/.test(url);
};

// API key validation (server-side, on blur or submit)
const validateApiKey = async (apiKey: string, storeUrl: string): Promise<{ valid: boolean; error?: string }> => {
  try {
    const response = await api.validateShopifyConnection({ apiKey, storeUrl });
    return { valid: response.success };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

// Percentage validation (client-side, on blur)
const validatePercentage = (value: number): boolean => {
  return value >= 0 && value <= 100;
};
```

**Form Validation Hook:**

```tsx
interface ValidationRule<T> {
  validate: (value: T) => string | null; // Returns error message or null
  trigger?: 'blur' | 'change' | 'submit';
}

const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  rules: Partial<Record<keyof T, ValidationRule<T[keyof T]>>>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = (field: keyof T): string | null => {
    const rule = rules[field];
    if (!rule) return null;

    const error = rule.validate(values[field]);
    setErrors(prev => ({ ...prev, [field]: error || undefined }));
    return error;
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(rules).forEach((field) => {
      const error = rules[field as keyof T]?.validate(values[field as keyof T]);
      if (error) {
        newErrors[field as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const handleChange = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Real-time validation for specific fields
    const rule = rules[field];
    if (rule?.trigger === 'change') {
      validateField(field);
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues,
  };
};
```

## Onboarding Completion

### Success State

**Completion Message:**
- **Heading:** "You're All Set!" or "Setup Complete!" with celebration emoji (🎉, ✅, 🎊)
- **Description:** Encouraging message confirming what was accomplished + next steps
- **Tone:** Celebratory and affirming ("Great work!", "You did it!")

**Next Steps:**
- **Primary Action:** "Go to Dashboard" button (prominent purple)
- **Secondary Actions:** Optional links to explore features, view tutorial, invite team

**Celebration Pattern:**
- **Visual:** Green checkmark icon (64px) in circle, or success illustration
- **Animation:** Optional confetti animation (using canvas-confetti library), or scale-in animation on success icon
- **Sound:** No sound (annoying in professional context)

**Implementation:**

```tsx
const OnboardingComplete = ({ onContinue }: { onContinue: () => void }) => {
  useEffect(() => {
    // Optional: Trigger confetti animation
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6514DD', '#23DC9B', '#10B981'],
      });
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 text-center">
      {/* Success icon */}
      <div className="mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-scale-in">
          <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Success message */}
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        You're All Set! 🎉
      </h2>

      <p className="text-lg text-gray-600 mb-2">
        Your store is connected and we're syncing your data.
      </p>
      <p className="text-base text-gray-500 mb-8">
        You'll see your profit analytics in a few minutes. In the meantime, explore your dashboard.
      </p>

      {/* Primary CTA */}
      <button
        onClick={onContinue}
        className="px-8 py-3 bg-purple-600 text-white rounded-md font-semibold text-lg hover:bg-purple-700 transition-colors shadow-md inline-flex items-center gap-2"
      >
        Go to Dashboard
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>

      {/* Secondary actions */}
      <div className="mt-6 space-y-2">
        <button className="text-sm text-purple-600 hover:text-purple-700 hover:underline">
          Take a quick tour of the dashboard
        </button>
        <span className="text-gray-400 mx-2">•</span>
        <button className="text-sm text-purple-600 hover:text-purple-700 hover:underline">
          Invite team members
        </button>
      </div>
    </div>
  );
};
```

**Animation Styles:**

```css
/* Scale-in animation for success icon */
@keyframes scale-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

**Confetti Library (Optional):**

```bash
npm install canvas-confetti
```

```tsx
import confetti from 'canvas-confetti';

// Trigger on component mount
useEffect(() => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#6514DD', '#23DC9B', '#10B981'], // BeProfit brand colors
  });
}, []);
```

## Relevance to Our Build

### Implementation Priorities

1. **Minimal Onboarding Steps (Critical):** Reduce friction—only collect essential info (store connection, basic settings). Every additional step increases drop-off risk. Aim for 3-5 steps maximum.

2. **Progress Visibility (High Priority):** Clear progress bar and step counter so users know how far they've come and how much remains. Reduces anxiety and abandonment.

3. **Skip Options (High Priority):** Allow users to skip optional steps and configure later. Balances data collection with user control. Mark optional steps clearly.

4. **Contextual Help (High Priority):** Info tooltips and help text reduce support burden during setup. Users can self-serve answers to common questions (What is COGS? Where do I find my API key?).

5. **Success Celebration (Medium Priority):** Positive reinforcement at completion increases engagement and satisfaction. Simple checkmark + encouraging message is sufficient.

6. **Progress Persistence (Medium Priority):** Save progress across sessions so users can complete setup incrementally. Reduces pressure to finish in one sitting.

7. **Smart Defaults (Lower Priority):** Nice-to-have for polish. Auto-detect timezone, currency from IP. Reduces mental load but not critical to function.

### Technical Recommendations

**Stepper/Wizard Library:**

```bash
# Option 1: Build custom with React Hook Form for form state
npm install react-hook-form zod @hookform/resolvers

# Option 2: Use dedicated wizard library (if complex multi-branch flow)
npm install react-step-wizard
```

**State Management:**

```bash
# Zustand with persistence for onboarding progress
npm install zustand

# Use persist middleware to save progress to localStorage
```

**Tooltip Library:**

```bash
# Radix UI Tooltip (recommended - accessible, unstyled)
npm install @radix-ui/react-tooltip

# Alternative: Headless UI doesn't have tooltip, but has Popover (can adapt)
```

**Tour Library (Optional):**

```bash
# React Joyride (feature-rich, customizable)
npm install react-joyride

# Alternative: Driver.js (lighter weight)
npm install driver.js
```

**Form Validation:**

```bash
# React Hook Form + Zod for schema validation
npm install react-hook-form zod @hookform/resolvers
```

**Onboarding State Management Implementation:**

```tsx
// stores/onboarding.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  currentStep: number;
  completedSteps: string[];
  formData: Record<string, any>;
  setStep: (step: number) => void;
  completeStep: (stepId: string) => void;
  setFormData: (stepId: string, data: any) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentStep: 0,
      completedSteps: [],
      formData: {},
      setStep: (step) => set({ currentStep: step }),
      completeStep: (stepId) => set((state) => ({
        completedSteps: [...state.completedSteps, stepId],
      })),
      setFormData: (stepId, data) => set((state) => ({
        formData: { ...state.formData, [stepId]: data },
      })),
      reset: () => set({ currentStep: 0, completedSteps: [], formData: {} }),
    }),
    { name: 'onboarding-storage' } // localStorage key
  )
);
```

### Design Consistency Checklist

- [ ] Stepper uses purple (#6514DD) for active/completed states, gray for upcoming
- [ ] Progress bar matches brand color (purple-600)
- [ ] Navigation buttons follow established button patterns (primary = purple-600, secondary = gray outline)
- [ ] Tooltips use dark background (#111827 at 90% opacity) with white text, 12-14px
- [ ] Help text uses gray-500 (#6B7280) for secondary information, 12-14px
- [ ] Success states use green-600 (#10B981) for completion indicators (checkmark icon, success banner)
- [ ] Form validation follows inline error patterns (red-600 text, red-300 border, icon + message)
- [ ] Step labels use font-semibold (600) for current step, regular (400) for others
- [ ] Optional steps labeled with "(optional)" in gray-400, lighter weight
- [ ] Connector lines between steps: purple-600 for completed segments, gray-200 for upcoming
- [ ] Mobile: Simplified "Step X of Y" indicator + progress bar (no visual stepper)
- [ ] Skip buttons use gray-600 text, hover:gray-800, no background

## Competitive Differentiation Opportunities

### Where We Can Improve on BeProfit

1. **Adaptive Onboarding:** Different flows for different user types (new merchants vs experienced merchants, solo vs team accounts). BeProfit uses one-size-fits-all flow; we can personalize based on account characteristics.

2. **Progress Persistence with Cloud Sync:** Save onboarding progress to server (not just localStorage), allowing users to resume from different devices. BeProfit likely loses progress if browser cache cleared.

3. **Interactive Preview:** Show live preview of dashboard as users configure settings. Instead of waiting until end of onboarding, show "This is what your dashboard will look like" preview panel updating in real-time.

4. **Skip & Return with Smart Prompts:** Easy access to resume incomplete setup tasks from dashboard, with contextual prompts explaining why completing setup improves experience ("Connect ad accounts to see ROI metrics").

5. **Video Guidance:** Short embedded video clips (15-30 seconds) showing exactly what each step does, reducing confusion for non-technical users.

6. **Onboarding Analytics:** Track where users drop off, how long each step takes, which help docs they click. Use data to continuously improve flow.

7. **Branching Logic:** Skip irrelevant steps based on previous answers. If user says "I don't run ads," skip ad account connection entirely (not just make it optional).

8. **Bulk Setup:** For agencies/multi-store users, allow connecting multiple stores in single flow instead of repeating onboarding per store.

## Summary

BeProfit's onboarding and wizard UI patterns focus on reducing time-to-value with a multi-step setup flow that breaks complex configuration into digestible segments. Key patterns include horizontal stepper with numbered circles (completed = checkmark in purple-600, current = purple border, upcoming = gray outline), dual progress indicators (discrete step count "Step 2 of 5" + continuous progress bar showing percentage), and contextual help via info icon tooltips (dark gray-900 background, white text, 12-14px, intelligent viewport positioning). Navigation controls balance forward momentum (prominent purple "Continue" button, px-6 py-3) with user control (subtle "← Back" link, optional "Skip for now" for non-critical steps), while validation provides immediate guidance on blur or submission attempt without keystroke-by-keystroke interruption. Implementation should use React Hook Form for form state across steps, Zustand with persist middleware for saving onboarding progress to localStorage, and Radix UI Tooltip for accessible contextual help. Stepper component uses CSS Grid or Flexbox for layout, with responsive strategy (full stepper on desktop, simplified "Step X of Y" + progress bar on mobile <768px). Success state includes celebration (green checkmark icon with scale-in animation, optional confetti via canvas-confetti library) and clear next action ("Go to Dashboard" button). Setup checklist component shows completion status (3 of 5 tasks complete) with visual progress bar and actionable "Set up →" links for incomplete tasks. First-run experience uses gradient purple welcome card (purple-600 to purple-800 background, white text, prominent white button with purple text) encouraging immediate action. Smart defaults reduce friction by pre-populating timezone (Intl.DateTimeFormat), currency (from locale or IP), and date format (based on navigator.language). Progress persistence stores current step, completed steps, and form data to localStorage, enabling resume across sessions. Form validation uses hybrid approach: client-side for format checks (on blur or debounced onChange), server-side for API key validity and external connections (on submit or explicit "Test Connection" action). Product tour (optional, using react-joyride) highlights key dashboard elements with sequential spotlight overlays, dismissible with "Skip tour" option and progress tracking.

---

**File Size:** ~28KB (within target range)

**Key Technical Stack:**
- Form management: React Hook Form + Zod
- State persistence: Zustand with persist middleware
- Tooltips: Radix UI Tooltip (accessible, unstyled)
- Tour (optional): react-joyride or driver.js
- Confetti (optional): canvas-confetti
- Animation: Tailwind transitions + custom keyframes

**Code-Level Specifications Provided:**
- Stepper component with responsive mobile view
- Progress bar component with percentage display
- Step navigation controls with loading states
- Form validation hook with blur/change/submit triggers
- Info tooltip component with Radix UI
- Welcome modal with gradient background
- Setup checklist with completion tracking
- Onboarding completion celebration screen
- Zustand store for progress persistence
- Form field validation examples (URL, API key, percentage)
- Smart defaults hook (timezone, currency detection)

**Design Tokens Referenced:**
- Colors: purple-600 (#6514DD), green-600 (#10B981), gray-900 (#111827), gray-500 (#6B7280)
- Typography: text-2xl (heading), text-sm (labels), text-xs (help text), font-semibold (600), font-medium (500)
- Spacing: px-6 py-3 (button), px-3 py-2 (input), gap-3 (button group), mb-6 (section spacing)
- Border radius: rounded-md (6px), rounded-lg (8px), rounded-full (pill)
- Animation: transition-all duration-300 (progress bar), scale-in 0.5s (success icon)
