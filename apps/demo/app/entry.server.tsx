import React from 'react';
import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';
import { renderStylesToString } from '@emotion/server';

import { createEmotionCache, ServerStyleContext } from './styles.emotion';
import createCache from '@emotion/cache';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const cache = createEmotionCache();
  createEmotionServer(cache);

  const html = renderToString(
    <CacheProvider value={cache}>
      <RemixServer context={remixContext} url={request.url} />
    </CacheProvider>
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(`<!DOCTYPE html>${renderStylesToString(html)}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
