import type { MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { useEffect, useLayoutEffect, useRef } from 'react';
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

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function App() {
  useMutationObserver();
  const mainWrapper = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    if (mainWrapper.current) {
      const defaultLayers = getComputedStyle(mainWrapper.current)
        .getPropertyValue('--defaultLayers')
        .split(',')
        .map((s) => s.trim());
      mainWrapper.current.classList.add(...defaultLayers);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div data-radius-watch ref={mainWrapper}>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
