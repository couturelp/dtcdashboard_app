import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const FROM_EMAIL = 'noreply@dtcdashboard.com';
const FROM_NAME = 'DTC Dashboard';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

/** Escape HTML special characters to prevent injection in email templates. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

async function sendEmail({ to, subject, html, text }: SendEmailParams): Promise<void> {
  if (!SENDGRID_API_KEY) {
    console.warn('[Email] SENDGRID_API_KEY not set — skipping email send. Subject:', subject);
    console.warn('[Email] Would have sent to:', to);
    return;
  }

  await sgMail.send({
    to,
    from: { email: FROM_EMAIL, name: FROM_NAME },
    subject,
    html,
    text,
  });
}

export async function sendVerificationEmail(to: string, token: string): Promise<void> {
  const verifyUrl = `${APP_URL}/api/auth/verify-email?token=${token}`;

  await sendEmail({
    to,
    subject: 'Verify your DTC Dashboard account',
    text: `Welcome to DTC Dashboard!\n\nPlease verify your email by visiting this link:\n${verifyUrl}\n\nThis link expires in 24 hours.\n\nIf you did not create an account, you can safely ignore this email.`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 600; color: #111; margin-bottom: 16px;">Welcome to DTC Dashboard</h1>
        <p style="font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 24px;">Please verify your email address to activate your account.</p>
        <a href="${verifyUrl}" style="display: inline-block; background: #4F46E5; color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 16px;">Verify Email</a>
        <p style="font-size: 14px; color: #888; margin-top: 32px; line-height: 1.5;">This link expires in 24 hours. If you did not create an account, you can safely ignore this email.</p>
      </div>
    `,
  });
}

export async function sendMagicLinkEmail(to: string, token: string): Promise<void> {
  const magicLinkUrl = `${APP_URL}/api/auth/magic-link/verify?token=${token}`;

  await sendEmail({
    to,
    subject: 'Your DTC Dashboard login link',
    text: `Hi,\n\nYou requested a login link for DTC Dashboard.\n\nClick here to log in:\n${magicLinkUrl}\n\nThis link expires in 15 minutes and can only be used once.\n\nIf you did not request this, you can safely ignore this email.`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 600; color: #111; margin-bottom: 16px;">Your login link</h1>
        <p style="font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 24px;">Click the button below to log in to DTC Dashboard. This link expires in 15 minutes and can only be used once.</p>
        <a href="${magicLinkUrl}" style="display: inline-block; background: #4F46E5; color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 16px;">Log In</a>
        <p style="font-size: 14px; color: #888; margin-top: 32px; line-height: 1.5;">If you did not request this link, you can safely ignore this email.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(to: string, token: string): Promise<void> {
  const resetUrl = `${APP_URL}/app/reset-password?token=${token}`;

  await sendEmail({
    to,
    subject: 'Reset your DTC Dashboard password',
    text: `Hi,\n\nYou requested a password reset for your DTC Dashboard account.\n\nClick here to reset your password:\n${resetUrl}\n\nThis link expires in 1 hour and can only be used once.\n\nIf you did not request this, you can safely ignore this email. Your password will not change.`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 600; color: #111; margin-bottom: 16px;">Reset your password</h1>
        <p style="font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 24px;">Click the button below to reset your DTC Dashboard password. This link expires in 1 hour.</p>
        <a href="${resetUrl}" style="display: inline-block; background: #4F46E5; color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 16px;">Reset Password</a>
        <p style="font-size: 14px; color: #888; margin-top: 32px; line-height: 1.5;">If you did not request this reset, you can safely ignore this email. Your password will not change.</p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  const safeName = escapeHtml(name || 'there');

  await sendEmail({
    to,
    subject: 'Welcome to DTC Dashboard',
    text: `Hi ${name || 'there'},\n\nYour DTC Dashboard account is now active. You can start by setting up your store and connecting your data sources.\n\nLog in at: ${APP_URL}/app\n\nBest,\nThe DTC Dashboard Team`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 600; color: #111; margin-bottom: 16px;">You're all set, ${safeName}!</h1>
        <p style="font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 24px;">Your DTC Dashboard account is now active. Start by setting up your store and connecting your data sources.</p>
        <a href="${APP_URL}/app" style="display: inline-block; background: #4F46E5; color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 16px;">Go to Dashboard</a>
      </div>
    `,
  });
}
