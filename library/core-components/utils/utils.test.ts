import { renderCSSProp } from './design-tokens.utils';

describe('utils', () => {
  describe('design-tokens.utils', () => {
    describe('renderCSSProp', () => {
      it('should return a CSS variable when passed a string', () => {
        expect(renderCSSProp('--color-text-on-base-primary')).toBe(
          'var(--color-text-on-base-primary)'
        );
      });
      it('should return a CSS expression when passed an object', () => {
        expect(
          renderCSSProp({
            css: '1px solid red',
          })
        ).toBe('1px solid red');
      });
    });
  });
});
