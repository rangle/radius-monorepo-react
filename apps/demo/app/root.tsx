import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import styles from '@rangle/radius-foundations/styles.css';
import { useMutationObserver } from './utils/demo.utils';
import { css, Global } from '@emotion/react';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Radius Demo Application',
  viewport: 'width=device-width,initial-scale=1',
});

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
}

export default function App() {
  useMutationObserver(() => {
    console.log('mutation observer');
  });
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <Global
          styles={css`
            body,
            main {
              margin: 0;
              background: var(--color-component-layout-background);
            }
          `}
        />
      </head>
      <body>
        <main className="saddles light-mode" data-radius-watch>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
