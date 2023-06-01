import * as React from 'react';
import { RemixBrowser } from '@remix-run/react';
import { hydrate } from 'react-dom';
import { CacheProvider } from '@emotion/react';

import { createEmotionCache, ClientStyleContext } from './styles.emotion';

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = React.useState(createEmotionCache());

  const reset = React.useCallback(() => {
    setCache(createEmotionCache());
  }, []);

  const context = React.useMemo(() => ({ reset }), [reset]);

  return (
    <ClientStyleContext.Provider value={context}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

hydrate(
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>,
  document
);
