import { createContext } from 'react';
import createCache from '@emotion/cache';

export interface ServerStyleContextData {
  key: string;
  ids: Array<string>;
  css: string;
}

export const ServerStyleContext = createContext<
  null | ServerStyleContextData[]
>(null);

export function createEmotionCache() {
  return createCache({ key: 'remix-app' });
}

export interface ClientStyleContextData {
  reset: () => void;
}

export const ClientStyleContext = createContext<ClientStyleContextData>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reset: () => {},
});
