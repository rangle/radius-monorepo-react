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
    {
      // favicon
      rel: 'icon',
      href: 'https://res.cloudinary.com/rangle/image/upload/v1674695824/rangle.io/Meta/rxtiy88j4bvmne1kxlrb.ico',
      type: 'image/x-icon',
      preload: 'true',
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
      </head>
      <body>
        <div className="saddles light-mode" data-radius-watch>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
