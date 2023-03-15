// import userEvent from '@testing-library/user-event';
import { getSize, getCssValue, setPosition } from '../auto-box.styles';

describe('AutoBox Styles', () => {
  test('getSize', () => {
    expect(getSize(5)).toBe('5px');
    expect(getSize('5px')).toBe('5px');
    expect(getSize('5%')).toBe('5%');
    expect(getSize('var(--the-width)')).toBe('var(--the-width)');
    expect(getSize('fill-parent')).toBe('100%');
    expect(getSize('hug-contents')).toBe('auto');
    expect(getSize()).toBe('auto');
  });

  test('getCssValue', () => {
    expect(getCssValue(5)).toBe('5px');
    expect(getCssValue('5px')).toBe('5px');
    expect(getCssValue('5%')).toBe('5%');
    expect(getCssValue('var(--the-width)')).toBe('var(--the-width)');
    expect(getCssValue()).toBe('0px');
  });

  test('setPosition', () => {
    expect(setPosition(5, 'var(--var-width)')).toBe(
      'left: 5px;top: var(--var-width);'
    );
    expect(setPosition('5px', '5%')).toBe('left: 5px;top: 5%;');

    expect(setPosition(5, 'var(--var-width)', 'right', 'bottom')).toBe(
      'right: 5px;bottom: var(--var-width);'
    );
    expect(setPosition('5px', '5%', 'right', 'bottom')).toBe(
      'right: 5px;bottom: 5%;'
    );
  });
});
