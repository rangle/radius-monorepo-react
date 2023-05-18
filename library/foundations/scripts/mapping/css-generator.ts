// Generator Mappings for CSS
import type { GeneratorMappingDictionary } from '../lib/token-parser';

export default {
  css: [
    ['color', 'color'],
    [
      /--typography/,
      [
        [/Light/g, '300'],
        [/Regular/g, '400'],
        [/Medium/g, '500'],
        [/Bold/g, '700'],
        [/Heavy/g, '900'],
      ],
    ],
    [
      /--letterSpacing/,
      // preserve sign ($1), divide value ($2) by 100, replace % with em
      [[/(-?)([0-9]*)%/g, 'calc($1$2em/100)']],
    ],
    [
      /--boxShadow/,
      // add missing `px` suffix to all lone numbers
      [[/\d+(?![^()]*\))/g, '$&px']],
    ],
    [
      /--direction.*/,
      // replace `vertical` with `column` and `horizontal` with `row`
      [
        [/^vertical$/, 'column'],
        [/^horizontal$/, 'row'],
      ],
    ],
  ],
} satisfies GeneratorMappingDictionary;
