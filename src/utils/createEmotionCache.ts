import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

// On the client side, create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'mui-style', insertionPoint });
}

// Export a singleton instance for client-side use
let clientSideEmotionCache: ReturnType<typeof createEmotionCache> | undefined;

export function getClientSideEmotionCache() {
  // Create the cache lazily on the client side
  if (isBrowser && !clientSideEmotionCache) {
    clientSideEmotionCache = createEmotionCache();
  }
  return clientSideEmotionCache;
}