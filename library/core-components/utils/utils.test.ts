import { renderCSSProp } from './design-tokens.utils';
import { flattenObject } from './flatten.utils';

describe('utils', () => {
  describe('design-tokens.utils', () => {
    describe('renderCSSProp', () => {
      it('should return undefined when passed undefined', () => {
        expect(renderCSSProp(undefined)).toBeUndefined();
      });
      it('should return a string with CSS variables when passed an array', () => {
        expect(
          renderCSSProp([
            '--color-core-color-red-50',
            '--color-core-color-red-50',
          ])
        ).toBe('var(--color-core-color-red-50) var(--color-core-color-red-50)');
      });
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

    describe('tokenArrayToString', () => {
      it('should return a string with CSS variables', () => {
        expect(
          renderCSSProp([
            '--color-core-color-red-50',
            '--color-core-color-red-50',
          ])
        ).toBe('var(--color-core-color-red-50) var(--color-core-color-red-50)');
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
