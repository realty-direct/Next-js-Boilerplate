import * as Sentry from '@sentry/nextjs';

const sentryOptions: Sentry.NodeOptions | Sentry.EdgeOptions = {
  // Sentry DSN
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Enable Spotlight only when explicitly enabled
  spotlight: process.env.NODE_ENV === 'development' && process.env.ENABLE_SPOTLIGHT === 'true',

  // Adds request headers and IP for users, for more info visit
  sendDefaultPii: true,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
};

export async function register() {
  try {
    if (!process.env.NEXT_PUBLIC_SENTRY_DISABLED) {
      if (process.env.NEXT_RUNTIME === 'nodejs') {
      // Node.js Sentry configuration
        Sentry.init(sentryOptions);
      }

      if (process.env.NEXT_RUNTIME === 'edge') {
      // Edge Sentry configuration
        Sentry.init(sentryOptions);
      }
    }
  } catch (error) {
    // Prevent any instrumentation errors from breaking the app
    console.log('Sentry server initialization error:', error);
  }
}

export const onRequestError = Sentry.captureRequestError;
