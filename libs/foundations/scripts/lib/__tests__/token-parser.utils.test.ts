import {
  toKebabCase,
  isEqual,
  isExpression,
  createReplaceFunction,
} from '../token-parser.utils';

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

  it('converts PascalCase input to kebab case', () => {
    expect(toKebabCase('PascalCaseInput')).toBe('pascal-case-input');
  });

  it(`correctly handles -PascalCase scenarios`, () => {
    expect(toKebabCase('test-PascalCaseInput')).toBe('test-pascal-case-input');
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
