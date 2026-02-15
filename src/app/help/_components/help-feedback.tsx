'use client';

import { useState } from 'react';

interface HelpFeedbackProps {
  articleId: string; // format: "category/slug"
}

export function HelpFeedback({ articleId }: HelpFeedbackProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);

  const handleFeedback = async (helpful: boolean) => {
    setIsHelpful(helpful);
    setSubmitted(true);

    try {
      await fetch('/api/help/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, helpful }),
      });
    } catch {
      // Silently fail — feedback is non-critical
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-sm text-brand-muted">
        <span>{isHelpful ? '\uD83D\uDC4D' : '\uD83D\uDC4E'}</span>
        <span>Thanks for your feedback!</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-brand-heading">
        Was this helpful?
      </span>
      <button
        onClick={() => handleFeedback(true)}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-brand-body hover:border-green-300 hover:text-green-600 transition-colors"
      >
        {'\uD83D\uDC4D'} Yes
      </button>
      <button
        onClick={() => handleFeedback(false)}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-brand-body hover:border-red-300 hover:text-red-600 transition-colors"
      >
        {'\uD83D\uDC4E'} No
      </button>
    </div>
  );
}
