import {
  isString,
  isArray,
  isJSONLeaf,
  isCompositeLeaf,
  isCompositeLeafBoxShadow,
  isCompositeLeafTypography,
  JSONCompositeLeaf,
  toKebabCase,
  TokenOutput,
  extractTokens,
  JSONStructure,
  isEqual,
  isExpression,
  createReplaceFunction,
} from './token-parser';
import { processReferences } from './token-parser';

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
        key: '--color-brand-primary',
        name: 'brand.primary',
        value: '#ff0000',
        type: 'color',
        description: undefined,
      },
      {
        key: '--color-brand-secondary',
        name: 'brand.secondary',
        value: '#00ff00',
        type: 'color',
        description: undefined,
      },
      {
        key: '--color-brand-background',
        name: 'brand.background',
        value: '#0000ff',
        type: 'color',
        description: undefined,
      },
      {
        key: '--typography-text-title-font',
        name: 'text.title.font',
        value: 'bold 16px/1.5 Arial',
        type: 'typography',
        description: 'Shorthand CSS font property',
        subtoken: 'font',
      },
      {
        key: '--typography-text-title-font-family',
        name: 'text.title.fontFamily',
        value: 'Arial',
        type: 'typography',
        description: 'CSS fontFamily property',
        subtoken: 'fontFamily',
      },
      {
        key: '--typography-text-title-font-weight',
        name: 'text.title.fontWeight',
        value: 'bold',
        type: 'typography',
        description: 'CSS fontWeight property',
        subtoken: 'fontWeight',
      },
      {
        key: '--typography-text-title-line-height',
        name: 'text.title.lineHeight',
        value: '1.5',
        type: 'typography',
        description: 'CSS lineHeight property',
        subtoken: 'lineHeight',
      },
      {
        key: '--typography-text-title-font-size',
        name: 'text.title.fontSize',
        value: '16px',
        type: 'typography',
        description: 'CSS fontSize property',
        subtoken: 'fontSize',
      },
      {
        key: '--typography-text-title-letter-spacing',
        name: 'text.title.letterSpacing',
        value: '0.5px',
        type: 'typography',
        description: 'CSS letterSpacing property',
        subtoken: 'letterSpacing',
      },
      {
        key: '--typography-text-title-paragraph-spacing',
        name: 'text.title.paragraphSpacing',
        value: '1em',
        type: 'typography',
        description: 'CSS paragraphSpacing property',
        subtoken: 'paragraphSpacing',
      },
      {
        key: '--typography-text-title-text-case',
        name: 'text.title.textCase',
        value: 'uppercase',
        type: 'typography',
        description: 'CSS textCase property',
        subtoken: 'textCase',
      },
      {
        key: '--typography-text-title-text-decoration',
        name: 'text.title.textDecoration',
        value: 'none',
        type: 'typography',
        description: 'CSS textDecoration property',
        subtoken: 'textDecoration',
      },
      {
        key: '--typography-text-body-font',
        name: 'text.body.font',
        value: 'normal 14px/1.2 Times New Roman',
        type: 'typography',
        description: 'Shorthand CSS font property',
        subtoken: 'font',
      },
      {
        key: '--typography-text-body-font-family',
        name: 'text.body.fontFamily',
        value: 'Times New Roman',
        type: 'typography',
        description: 'CSS fontFamily property',
        subtoken: 'fontFamily',
      },
      {
        key: '--typography-text-body-font-weight',
        name: 'text.body.fontWeight',
        value: 'normal',
        type: 'typography',
        description: 'CSS fontWeight property',
        subtoken: 'fontWeight',
      },
      {
        key: '--typography-text-body-line-height',
        name: 'text.body.lineHeight',
        value: '1.2',
        type: 'typography',
        description: 'CSS lineHeight property',
        subtoken: 'lineHeight',
      },
      {
        key: '--typography-text-body-font-size',
        name: 'text.body.fontSize',
        value: '14px',
        type: 'typography',
        description: 'CSS fontSize property',
        subtoken: 'fontSize',
      },
      {
        key: '--typography-text-body-letter-spacing',
        name: 'text.body.letterSpacing',
        value: '0.1px',
        type: 'typography',
        description: 'CSS letterSpacing property',
        subtoken: 'letterSpacing',
      },
      {
        key: '--typography-text-body-paragraph-spacing',
        name: 'text.body.paragraphSpacing',
        value: '0.5em',
        type: 'typography',
        description: 'CSS paragraphSpacing property',
        subtoken: 'paragraphSpacing',
      },
      {
        key: '--typography-text-body-text-case',
        name: 'text.body.textCase',
        value: 'lowercase',
        type: 'typography',
        description: 'CSS textCase property',
        subtoken: 'textCase',
      },
      {
        key: '--typography-text-body-text-decoration',
        name: 'text.body.textDecoration',
        value: 'underline',
        type: 'typography',
        description: 'CSS textDecoration property',
        subtoken: 'textDecoration',
      },
    ];
    const references = {};
    const tokenResult = extractTokens(
      tokenStructure as unknown as JSONStructure,
      '',
      references
    );
    expect(tokenResult).toMatchObject(expectedTokens);
  });
  it('Returns empty array for a null input', () => {
    expect(extractTokens({}, '')).toMatchObject([]);
  });
});

describe('processReferences', () => {
  const fbn = processReferences(
    {
      ['{test.x}']: {
        key: '{test.x}',
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
        key: '{test.y}',
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
        key: '{test.z}',
        token: {
          name: '',
          key: 'nn',
          type: 'c',
          value: '3',
        },
        isStatic: true,
        sources: [],
      },
      ['{core.color.red}']: {
        key: '{core.color.red}',
        token: {
          name: 'core.color.red',
          key: '--color-core-color-red',
          type: 'color',
          value: '#f00',
        },
        isStatic: true,
        sources: ['core'],
      },
      ['{core.color.green}']: {
        key: '{core.color.green}',
        token: {
          name: 'core.color.green',
          key: '--color-core-color-green',
          type: 'color',
          value: '#0f0',
        },
        isStatic: true,
        sources: ['core'],
      },
      ['{core.color.blue}']: {
        key: '{core.color.blue}',
        token: {
          name: 'core.color.blue',
          key: '--color-core-color-blue',
          type: 'color',
          value: '#00f',
        },
        isStatic: true,
        sources: ['core'],
      },
      ['{core.typography.small}']: {
        key: '{core.typography.small}',
        references: {
          ['font']: {
            key: '{core.typography.small.font}',
            token: {
              name: 'core.typography.small.font',
              key: '--typography-core-typography-small-font',
              type: 'typography',
              value: 'shorthand 100/100 SMALLFONTFAMILY',
              subtoken: 'font',
            },
            isStatic: true,
            sources: [],
          },
          ['fontFamily']: {
            key: '{core.typography.small.fontFamily}',
            token: {
              name: 'core.typography.small.fontFamily',
              key: '--typography-core-typography-small-fontFamily',
              type: 'typography',
              value: 'SMALLFONTFAMILY',
              subtoken: 'fontFamily',
            },
            isStatic: true,
            sources: [],
          },
          ['fontWeight']: {
            key: '{core.typography.small.fontWeight}',
            token: {
              name: 'core.typography.small.fontWeight',
              key: '--typography-core-typography-small-fontWeight',
              type: 'typography',
              value: 'HEAVYFONTWEIGHT',
              subtoken: 'fontWeight',
            },
            isStatic: true,
            sources: [],
          },
          ['lineHeight']: {
            key: '{core.typography.small.lineHeight}',
            token: {
              name: 'core.typography.small.lineHeight',
              key: '--typography-core-typography-small-lineHeight',
              type: 'typography',
              value: '100%',
              subtoken: 'lineHeight',
            },
            isStatic: true,
            sources: [],
          },
          ['fontSize']: {
            key: '{core.typography.small.fontSize}',
            token: {
              name: 'core.typography.small.fontSize',
              key: '--typography-core-typography-small-fontSize',
              type: 'typography',
              value: 'xsmall',
              subtoken: 'fontSize',
            },
            isStatic: true,
            sources: [],
          },
          ['letterSpacing']: {
            key: '{core.typography.small.letterSpacing}',
            token: {
              name: 'core.typography.small.letterSpacing',
              key: '--typography-core-typography-small-letterSpacing',
              type: 'typography',
              value: 'tight',
              subtoken: 'letterSpacing',
            },
            isStatic: true,
            sources: [],
          },
          ['paragraphSpacing']: {
            key: '{core.typography.small.paragraphSpacing}',
            token: {
              name: 'core.typography.small.paragraphSpacing',
              key: '--typography-core-typography-small-paragraphSpacing',
              type: 'typography',
              value: '0.4rem',
              subtoken: 'paragraphSpacing',
            },
            isStatic: true,
            sources: [],
          },
          ['paragraphIndent']: {
            key: '{core.typography.small.paragraphIndent}',
            token: {
              name: 'core.typography.small.paragraphIndent',
              key: '--typography-core-typography-small-paragraphIndent',
              type: 'typography',
              value: '',
              subtoken: 'paragraphIndent',
            },
            isStatic: true,
            sources: [],
          },
          ['textCase']: {
            key: '{core.typography.small.textCase}',
            token: {
              name: 'core.typography.small.textCase',
              key: '--typography-core-typography-small-textCase',
              type: 'typography',
              value: 'UPPERCASE',
              subtoken: 'textCase',
            },
            isStatic: true,
            sources: [],
          },
          ['textDecoration']: {
            key: '{core.typography.small.textDecoration}',
            token: {
              name: 'core.typography.small.textDecoration',
              key: '--typography-core-typography-small-textDecoration',
              type: 'typography',
              value: 'FLOWERS',
              subtoken: 'textDecoration',
            },
            isStatic: true,
            sources: [],
          },
        },
        isStatic: true,
        isReference: true,
        sources: [],
      },
      ['{semantic.typography.action}']: {
        key: '{semantic.typography.action}',
        token: {
          name: 'semantic.typography.action',
          key: '--typography-semantic-action',
          type: 'typography',
          value: '{core.typography.small}',
        },
        isStatic: false,
        sources: ['light mode', 'dark mode'],
      },
    },
    []
  );
  it('should find a single reference', () => {
    const [r] = fbn([], {
      name: '',
      key: 'nn',
      type: 'c',
      value: 'this {test.x} is alone',
    });
    expect(r.value).toMatch('this 1 is alone');
  });
  it('should find multiple references', () => {
    const [s] = fbn([], {
      name: '',
      key: 'nn',
      type: 'c',
      value: 'this {test.x} is a {test.y}/{test.z} different test',
    });
    expect(s.value).toMatch('this 1 is a 2/3 different test');
  });
  it('should expand a typography token into multiple tokens if it points to a composite reference', () => {
    const tokens = fbn([], {
      name: 'semantic.typography.action',
      key: '--typography-semantic-action',
      type: 'typography',
      value: '{core.typography.small}',
    });
    expect(tokens).toHaveLength(10);
  });
  it('should expand a typography token into multiple tokens with the appropriate names', () => {
    const tokens = fbn([], {
      name: 'semantic.typography.action',
      key: '--typography-semantic-action',
      type: 'typography',
      value: '{core.typography.small}',
    });
    const names = tokens.map((t) => t.name);
    expect(names).toEqual([
      'semantic.typography.action.font',
      'semantic.typography.action.fontFamily',
      'semantic.typography.action.fontWeight',
      'semantic.typography.action.lineHeight',
      'semantic.typography.action.fontSize',
      'semantic.typography.action.letterSpacing',
      'semantic.typography.action.paragraphSpacing',
      'semantic.typography.action.paragraphIndent',
      'semantic.typography.action.textCase',
      'semantic.typography.action.textDecoration',
    ]);
  });
  it('should expand a typography token into multiple tokens with the appropriate values', () => {
    const tokens = fbn([], {
      name: 'semantic.typography.action',
      key: '--typography-semantic-action',
      type: 'typography',
      value: '{core.typography.small}',
    });
    const values = tokens.map((t) => t.value);
    expect(values).toEqual([
      'shorthand 100/100 SMALLFONTFAMILY',
      'SMALLFONTFAMILY',
      'HEAVYFONTWEIGHT',
      '100%',
      'xsmall',
      'tight',
      '0.4rem',
      '',
      'UPPERCASE',
      'FLOWERS',
    ]);
  });
  it('should expand a typography token into multiple tokens when pointing to a typography reference', () => {
    const tokens = fbn([], {
      name: 'component.button.typography.label',
      key: '--typography-button-label',
      type: 'typography',
      value: '{semantic.typography.action}',
    });
    const values = tokens.map((t) => t.value);
    expect(values).toEqual([
      '{--typography-semantic-action-font}',
      '{--typography-semantic-action-font-family}',
      '{--typography-semantic-action-font-weight}',
      '{--typography-semantic-action-line-height}',
      '{--typography-semantic-action-font-size}',
      '{--typography-semantic-action-letter-spacing}',
      '{--typography-semantic-action-paragraph-spacing}',
      '{--typography-semantic-action-paragraph-indent}',
      '{--typography-semantic-action-text-case}',
      '{--typography-semantic-action-text-decoration}',
    ]);
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
