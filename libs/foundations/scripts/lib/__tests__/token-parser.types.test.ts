import { JSONCompositeLeaf } from '../token-parser.types';
import {
  isArray,
  isJSONLeaf,
  isCompositeLeaf,
  isCompositeLeafBoxShadow,
  isCompositeLeafTypography,
  isString,
} from '../token-parser.types';

describe('isString', () => {
  it('returns true for a string input', () => {
    expect(isString('hello')).toBe(true);
  });

  it('returns false for non-string input', () => {
    expect(isString(123)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
  });
});

describe('isArray', () => {
  it('returns true for an array input', () => {
    expect(isArray([1, 2, 3])).toBe(true);
  });

  it('returns false for non-array input', () => {
    expect(isArray('hello')).toBe(false);
    expect(isArray(123)).toBe(false);
    expect(isArray({})).toBe(false);
  });
});

describe('isJSONLeaf', () => {
  it('returns true for a JSONLeaf input', () => {
    const jsonLeaf = { value: 'hello', type: 'string' };
    expect(isJSONLeaf(jsonLeaf)).toBe(true);
  });

  it('returns false for non-JSONLeaf input', () => {
    expect(isJSONLeaf('hello')).toBe(false);
    expect(isJSONLeaf(123)).toBe(false);
    expect(isJSONLeaf({})).toBe(false);
    expect(isJSONLeaf([])).toBe(false);
  });
});

describe('isCompositeLeaf', () => {
  it('returns true for a JSONCompositeLeaf input', () => {
    const jsonCompositeLeaf = { type: 'object', value: {} };
    expect(isCompositeLeaf(jsonCompositeLeaf)).toBe(true);
  });

  it('returns false for non-JSONCompositeLeaf input', () => {
    expect(isCompositeLeaf('hello')).toBe(false);
    expect(isCompositeLeaf(123)).toBe(false);
    expect(isCompositeLeaf({})).toBe(false);
    expect(isCompositeLeaf([])).toBe(false);
  });
});

describe('isCompositeLeafBoxShadow', () => {
  it('returns true for a CompositeLeafBoxShadow input', () => {
    const compositeLeafBoxShadow = { type: 'boxShadow', value: [] };
    expect(isCompositeLeafBoxShadow(compositeLeafBoxShadow)).toBe(true);
  });

  it('returns false for non-CompositeLeafBoxShadow input', () => {
    expect(isCompositeLeafBoxShadow({ type: 'object', value: [] })).toBe(false);
  });
});

describe('isCompositeLeafTypography', () => {
  it('returns true for a CompositeLeafTypography input', () => {
    const compositeLeafTypography = {
      type: 'typography',
      value: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        lineHeight: '1.5',
        fontSize: '16px',
        letterSpacing: '0.5px',
        paragraphSpacing: '1em',
        textCase: 'uppercase',
        textDecoration: 'none',
      },
    };
    expect(isCompositeLeafTypography(compositeLeafTypography)).toBe(true);
  });
});

it('returns false for non-CompositeLeafTypography input', () => {
  const wrongType: JSONCompositeLeaf = { type: 'boxShadow', value: [] };
  expect(isCompositeLeafTypography(wrongType)).toBe(false);
  const missingType = {
    value: { fontFamily: 'Arial' },
  } as unknown as JSONCompositeLeaf;
  expect(isCompositeLeafTypography(missingType)).toBe(false);
  const missingValue = { type: 'typography' } as unknown as JSONCompositeLeaf;
  expect(isCompositeLeafTypography(missingValue)).toBe(false);
  const missingProperties: JSONCompositeLeaf = {
    type: 'typography',
    value: { missing: 'property' },
  };
  expect(isCompositeLeafTypography(missingProperties)).toBe(false);
  const notJSONCompositeLeaf = {} as unknown as JSONCompositeLeaf;
  expect(isCompositeLeafTypography(notJSONCompositeLeaf)).toBe(false);
});
