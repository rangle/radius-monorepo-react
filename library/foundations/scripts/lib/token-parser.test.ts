import {
  isString,
  isArray,
  isJSONLeaf,
  isCompositeLeaf,
  isCompositeLeafBoxShadow,
  isCompositeLeafTypography,
  processReferences,
  JSONCompositeLeaf,
  toKebabCase,
  TokenOutput,
  extractTokens,
  JSONStructure,
  isEqual,
  isExpression,
  createReplaceFunction,
} from './token-parser';

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

describe('toKebabCase', () => {
  it('converts empty input to an empty string', () => {
    expect(toKebabCase('')).toBe('');
  });

  it('converts camel case input to kebab case', () => {
    expect(toKebabCase('camelCaseInput')).toBe('camel-case-input');
  });

  it('ignores snake case input', () => {
    expect(toKebabCase('snake_case_input')).toBe('snake_case_input');
  });

  it('returns correct kebab case for a Punctuation Phrase! input', () => {
    expect(toKebabCase('Punctuation phrase!1')).toBe('punctuation-phrase-1');
    expect(toKebabCase('Punctuation,phrase 2')).toBe('punctuation-phrase-2');
    expect(toKebabCase('Punctuation.phrase 3')).toBe('punctuation-phrase-3');
  });
});

describe('isEqual', () => {
  it('should return true for identical objects', () => {
    const obj1 = { a: '1', b: '2' };
    const obj2 = { a: '1', b: '2' };
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('should return false for objects with different properties', () => {
    const obj1 = { a: '1', b: '2' };
    const obj2 = { a: '1' };
    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it('should return false for objects with different property values', () => {
    const obj1 = { a: '1', b: '2' };
    const obj2 = { a: '1', b: '3' };
    expect(isEqual(obj1, obj2)).toBe(false);
  });
});

describe('extractTokens', () => {
  it('extracts the correct tokens from a valid TokenStructure input', () => {
    const tokenStructure = {
      brand: {
        primary: { type: 'color', value: '#ff0000' },
        secondary: { type: 'color', value: '#00ff00' },
        background: { type: 'color', value: '#0000ff' },
      },
      text: {
        title: {
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
        },
        body: {
          type: 'typography',
          value: {
            fontFamily: 'Times New Roman',
            fontWeight: 'normal',
            lineHeight: '1.2',
            fontSize: '14px',
            letterSpacing: '0.1px',
            paragraphSpacing: '0.5em',
            textCase: 'lowercase',
            textDecoration: 'underline',
          },
        },
      },
    };
    const expectedTokens: TokenOutput[] = [
      {
        name: 'brand.primary',
        key: '--color-brand-primary',
        type: 'color',
        value: '#ff0000',
      },
      {
        name: 'brand.secondary',
        key: '--color-brand-secondary',
        type: 'color',
        value: '#00ff00',
      },
      {
        name: 'brand.background',
        key: '--color-brand-background',
        type: 'color',
        value: '#0000ff',
      },
      {
        name: 'text.title',
        key: '--typography-text-title',
        type: 'typography',
        value: 'bold 16px/1.5 Arial',
      },
      {
        name: 'text.body',
        key: '--typography-text-body',
        type: 'typography',
        value: 'normal 14px/1.2 Times New Roman',
      },
    ];
    expect(
      extractTokens(tokenStructure as unknown as JSONStructure, '')
    ).toMatchObject(expectedTokens);
  });
  it('Returns empty array for a null input', () => {
    expect(extractTokens({}, '')).toMatchObject([]);
  });
});

describe('processReferences', () => {
  const fbn = processReferences(
    {
      ['{test.x}']: {
        token: {
          name: '',
          key: 'nn',
          type: 'c',
          value: '1',
        },
        isStatic: true,
        sources: [],
      },
      ['{test.y}']: {
        token: {
          name: '',
          key: 'nn',
          type: 'c',
          value: '2',
        },
        isStatic: true,
        sources: [],
      },
      ['{test.z}']: {
        token: {
          name: '',
          key: 'nn',
          type: 'c',
          value: '3',
        },
        isStatic: true,
        sources: [],
      },
    },
    []
  );
  it('should find a single reference', () => {
    const r = fbn({
      name: '',
      key: 'nn',
      type: 'c',
      value: 'this {test.x} is alone',
    });
    expect(r.value).toMatch('this 1 is alone');
  });
  it('should find multiple references', () => {
    const s = fbn({
      name: '',
      key: 'nn',
      type: 'c',
      value: 'this {test.x} is a {test.y}/{test.z} different test',
    });
    expect(s.value).toMatch('this 1 is a 2/3 different test');
  });
});

describe('isExpression', () => {
  test('simple example: 2+2', () => {
    expect(isExpression('2+2')).toBe(true);
  });

  test('number and unit', () => {
    expect(isExpression('0.3 * 12px')).toBe(true);
  });

  test('two expressions, mixed whitespace', () => {
    expect(isExpression('1/2 * 2px')).toBe(true);
  });

  test('unit then number', () => {
    expect(isExpression('1.1rem / 0.23')).toBe(true);
  });

  test('three terms example: 1.1rem + 2rem * 1', () => {
    expect(isExpression('1.1rem + 2rem * 1')).toBe(true);
  });

  test('negative example: Medium 1rem/150% Riforma LL', () => {
    expect(isExpression('Medium 1rem/150% Riforma LL')).toBe(false);
  });

  test('negative example: empty string', () => {
    expect(isExpression('')).toBe(false);
  });

  test('negative example: only digits', () => {
    expect(isExpression('123')).toBe(false);
  });

  test('negative example: only operator', () => {
    expect(isExpression('+')).toBe(false);
  });

  test('negative example: only unit', () => {
    expect(isExpression('px')).toBe(false);
  });

  test('negative example: number followed by non-valid unit', () => {
    expect(isExpression('1inch')).toBe(false);
  });
});
describe('createReplaceFunction', () => {
  it('should return the original value if the mapping is empty', () => {
    const replace = createReplaceFunction([]);
    const result = replace('key', 'value');
    expect(result).toBe('value');
  });

  it('should replace the entire value of the "from" string with the "to" string', () => {
    const replace = createReplaceFunction([['hello', 'hi']]);
    const result = replace('key', 'hello');
    expect(result).toBe('hi');
  });

  it('should replace all occurrences of the generic "from" regex with the "to" string', () => {
    const replace = createReplaceFunction([[/hello/g, 'hi']]);
    const result = replace('key', 'hello world hello');
    expect(result).toBe('hi world hi');
  });

  it('should replace all occurrences of the generic "from" regex with the result of the "to" function', () => {
    const replace = createReplaceFunction([
      [/h.ll./g, (_, matches) => (matches ? matches[0].toUpperCase() : '')],
    ]);
    const result = replace('key', 'hello world hello');
    expect(result).toBe('HELLO world HELLO');
  });

  it('should replace occurrences of the specific "from" text with the "to" string for the right key', () => {
    const replace = createReplaceFunction([[/--mykey/, [['foo', 'baz']]]]);
    const result = replace('--mykey', 'foo bar foo');
    expect(result).toBe('baz bar foo');
  });

  it('should replace occurrences of the specific "from" regex with the "to" string for the right key', () => {
    const replace = createReplaceFunction([[/--mykey/, [[/foo/g, 'baz']]]]);
    const result = replace('--mykey', 'foo bar foo');
    expect(result).toBe('baz bar baz');
  });

  it('should replace all occurrences of the specific "from" regex with the result of the "to" function', () => {
    const replace = createReplaceFunction([
      [
        /--mykey/,
        [
          [
            /foo (\w+)/g,
            (_, matches) => (matches ? matches[0].toUpperCase() : ''),
          ],
        ],
      ],
    ]);
    const result = replace('--mykey', 'foo world foo');
    expect(result).toBe('FOO WORLD foo');
  });

  it('should not replace anything if the key does not match the specific token regex', () => {
    const replace = createReplaceFunction([[/--foo/, [['bar', 'baz']]]]);
    const result = replace('--notfoo', 'bar');
    expect(result).toBe('bar');
  });

  it('should not replace anything if the value does not match the specific from regex', () => {
    const replace = createReplaceFunction([[/--foo/g, [[/bar/, 'baz']]]]);
    const result = replace('--notfoo', 'foo bar foo');
    expect(result).toBe('foo bar foo');
  });

  it('should not replace anything if the value does not match anything', () => {
    const replace = createReplaceFunction([[/abc/g, [['def', 'ghi']]]]);
    const result = replace('miss', 'nothing matches here');
    expect(result).toBe('nothing matches here');
  });
});
