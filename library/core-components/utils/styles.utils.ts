import { useMemo } from 'react';
import { CSSInterpolation, css as emotionCSS } from '@emotion/css';

/**
 * Uses the `@emotion/css` function and `useMemo` to create a `useStyles` hook,
 * which behaves like the `css` function but automatically memoizes the result
 * based on the arguments passed in. This is important for performance reasons
 * as it prevents unnecessary calculations when the outputs won't change between
 * renders. This is especially important when a component is rendered frequently,
 * such as in a list.
 *
 * For more information on the `@emotion/css` function see:
 * https://emotion.sh/docs/@emotion/css
 *
 * Note: You can take advantage of CSS syntax highlighting in your IDE by
 * installing the `vscode-styled-components` extension:
 * https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components.
 * This extension recognizes the `css` function name (this also works for the
 * native `@emotion/css` function).
 */
export const css = (
  template: TemplateStringsArray,
  ...args: CSSInterpolation[]
) => {
  const useStyles = useMemo(() => {
    return emotionCSS(template, ...args);
  }, args);

  return useStyles;
};
