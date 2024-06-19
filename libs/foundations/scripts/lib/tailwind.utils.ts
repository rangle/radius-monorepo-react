export const tokenTypeNames = [
  // Responsiveness
  'screens',
  'supports',
  'data',

  // Reusable base configs
  'colors',
  'spacing',

  // Components
  'container',

  // Utilities
  'inset',
  'zIndex',
  'order',
  'gridColumn',
  'gridColumnStart',
  'gridColumnEnd',
  'gridRow',
  'gridRowStart',
  'gridRowEnd',

  'aspectRatio',

  'height',
  'maxHeight',
  'minHeight',
  'width',
  'maxWidth',
  'minWidth',

  'gap',

  'backgroundColor',

  'fill',
  'stroke',

  'padding',
  'margin',

  'flex',
  'flexShrink',
  'flexGrow',
  'flexBasis',

  'borderSpacing',
  'transformOrigin',
  'translate',
  'rotate',
  'skew',
  'scale',
  'animation',
  'keyframes',
  'cursor',
  'scrollMargin',
  'scrollPadding',
  'listStyleType',
  'columns',
  'gridAutoColumns',
  'gridAutoRows',
  'gridTemplateColumns',
  'gridTemplateRows',
  'space',
  'divideWidth',
  'divideColor',
  'divideOpacity',

  'borderRadius',
  'borderWidth',
  'borderColor',
  'borderOpacity',
  'backgroundOpacity',
  'backgroundImage',
  'gradientColorStops',
  'backgroundSize',
  'backgroundPosition',
  'strokeWidth',
  'objectPosition',

  'textIndent',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
  'textColor',
  'textOpacity',
  'textDecorationColor',
  'textDecorationThickness',
  'textUnderlineOffset',

  'placeholderColor',
  'placeholderOpacity',
  'caretColor',
  'accentColor',
  'opacity',
  'boxShadow',
  'boxShadowColor',
  'outlineWidth',
  'outlineOffset',
  'outlineColor',
  'ringWidth',
  'ringColor',
  'ringOpacity',
  'ringOffsetWidth',
  'ringOffsetColor',
  'blur',
  'brightness',
  'contrast',
  'dropShadow',
  'grayscale',
  'hueRotate',
  'invert',
  'saturate',
  'sepia',
  'backdropBlur',
  'backdropBrightness',
  'backdropContrast',
  'backdropGrayscale',
  'backdropHueRotate',
  'backdropInvert',
  'backdropOpacity',
  'backdropSaturate',
  'backdropSepia',
  'transitionProperty',
  'transitionTimingFunction',
  'transitionDelay',
  'transitionDuration',
  'willChange',
  'content',
  'aria',
] as const;

export type TokenTypeName = (typeof tokenTypeNames)[number];

const tailwindThemeMap: Record<string, TokenTypeName> = {
  ...Object.fromEntries(tokenTypeNames.map((key) => [key, key])),
  // custom entries to fix imperfections in the variable names
  color: 'colors',
  iconSize: 'spacing',
  breakpoints: 'screens',
  fontFamilies: 'fontFamily',
  fontWeights: 'fontWeight',
  fontSize: 'fontSize',
  lineHeights: 'lineHeight',
};

export const isTokenTypeName = (key: string): key is TokenTypeName =>
  tokenTypeNames.includes(key as TokenTypeName);

/**
 * prrocess the key name to remove the tailwind type from the name
 */
export const processKeyName = (key: string): string => {
  const segments = key.split('.');
  // find the type in the name
  const typeSegment = segments.find((segment) => tailwindThemeMap[segment]);
  return [
    typeSegment ? tailwindThemeMap[typeSegment] : 'unknown',
    segments
      .filter((n) => n !== typeSegment)
      .join('-')
      .replace(' ', '-'),
  ].join('.');
};
