import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Radius Demo Application',
  viewport: 'width=device-width,initial-scale=1',
});

// import styles from './styles/global.css';
import theme from "../../../library/foundations/generated/theme.css";
import font from "../../../shared/fonts/fonts.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: theme,
    },
    {
      rel: 'stylesheet',
      href: font,
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="light-mode">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
