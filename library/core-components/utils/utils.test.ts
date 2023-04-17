import { renderCSSProp } from './design-tokens.utils';

describe('utils', () => {
  describe('design-tokens.utils', () => {
    describe('renderCSSProp', () => {
      it('should return a CSS variable when passed a string', () => {
        expect(renderCSSProp('--color-core-color-red-50')).toBe(
          'var(--color-core-color-red-50)'
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
