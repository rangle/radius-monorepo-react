import { renderCSSProp } from './design-tokens.utils';
import { flattenObject } from './flatten.utils';

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

    describe('PrefixWithVar', () => {
      it('should return a CSS variable when passed a string', () => {
        expect(renderCSSProp('--test')).toBe('var(--test)');
      });

      it('should return multiple CSS variables when passed a string with multiple tokens', () => {
        expect(renderCSSProp('--test --test2')).toBe(
          'var(--test) var(--test2)'
        );
      });
    });
  });

  describe('flatten.utils', () => {
    describe('flattenObject', () => {
      it('should flatten an object into an array', () => {
        const obj = {
          a: 1,
          b: {
            c: 2,
            d: {
              e: 3,
            },
          },
        };
        expect(flattenObject(obj)).toEqual([1, 2, 3]);
      });
    });
  });
});
