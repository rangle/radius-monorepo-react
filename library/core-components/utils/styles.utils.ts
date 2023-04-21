import { useMemo } from 'react';
import { CSSInterpolation, css } from '@emotion/css';

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
 */
export const createUseStyles = (
  template: TemplateStringsArray,
  ...args: CSSInterpolation[]
) => {
  const useStyles = useMemo(() => {
    return css(template, ...args);
  }, args);

  return useStyles;
};
