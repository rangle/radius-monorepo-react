// import userEvent from '@testing-library/user-event';
import {
  getSize,
  getCssValue,
  getPadding,
  getColor,
  getStrokeWidth,
  getCornerRadius,
  setPosition,
  getEffects,
} from '../auto-box.styles';

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

  test('getPadding', () => {
    expect(getPadding(5)).toBe('5px');
    expect(getPadding('5px')).toBe('5px');
    expect(getPadding('5%')).toBe('5%');
    expect(getPadding('var(--the-width)')).toBe('var(--the-width)');

    expect(getPadding({ vertical: 5, horizontal: '5px' })).toBe('5px 5px');
    expect(getPadding({ vertical: '5%', horizontal: 'var(--the-width)' })).toBe(
      '5% var(--the-width)'
    );
    expect(
      getPadding({
        top: 5,
        right: '5px',
        bottom: '5%',
        left: 'var(--the-width)',
      })
    ).toBe('5px 5px 5% var(--the-width)');
    expect(getPadding()).toBe('0px');
  });

  test('getColor', () => {
    expect(getColor('#f00')).toBe('#f00');
    expect(getColor('#ff0000')).toBe('#ff0000');
    expect(getColor({ r: 255, g: 255, b: 255, a: 0.5 })).toBe(
      'rgba(255,255,255,0.5)'
    );
    expect(getColor({ r: 255, g: 255, b: 255, a: 50 })).toBe(
      'rgba(255,255,255,0.5)'
    );
    expect(getColor('var(--the-color)')).toBe('var(--the-color)');
    expect(getColor()).toBe('transparent');
  });

  test('getStrokeWidth', () => {
    expect(getStrokeWidth(5)).toBe('border-width: 5px;');
    expect(getStrokeWidth('5px')).toBe('border-width: 5px;');
    expect(getStrokeWidth('5%')).toBe('border-width: 5%;');
    expect(
      getStrokeWidth({
        top: 5,
        right: '5px',
        bottom: '5%',
        left: 'var(--var-width)',
      })
    ).toBe('border-width: 5px 5px 5% var(--var-width);');
  });

  test('getCornerRadius', () => {
    expect(getCornerRadius(5)).toBe('border-radius: 5px;');
    expect(getCornerRadius('5px')).toBe('border-radius: 5px;');
    expect(getCornerRadius('5%')).toBe('border-radius: 5%;');
    expect(getCornerRadius('var(--var-width)')).toBe(
      'border-radius: var(--var-width);'
    );
    expect(
      getCornerRadius({
        topLeft: 5,
        topRight: '5px',
        bottomRight: '5%',
        bottomLeft: 'var(--var-width)',
      })
    ).toBe('border-radius: 5px 5px 5% var(--var-width);');
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

  test('getEffects', () => {
    expect(
      getEffects({
        type: 'drop-shadow',
        offset: [1, 2],
        color: '#300',
        blur: 4,
      })
    ).toBe(' box-shadow: 1px 2px 4px #300;');
    expect(
      getEffects({
        type: 'inner-shadow',
        offset: [1, 2],
        color: '#300',
        blur: 4,
      })
    ).toBe(' box-shadow: inset 1px 2px 4px #300;');
    expect(
      getEffects({
        type: 'layer-blur',
        blur: 1,
      })
    ).toBe(' filter: blur(1px);');
    expect(
      getEffects({
        type: 'background-blur',
        blur: 1,
      })
    ).toBe(' backdrop-filter: blur(1px);');

    expect(
      getEffects([
        {
          type: 'drop-shadow',
          offset: [1, 2],
          color: '#300',
          blur: 4,
        },
        {
          type: 'layer-blur',
          blur: 1,
        },
      ])
    ).toBe(' box-shadow: 1px 2px 4px #300; filter: blur(1px);');
  });
});
