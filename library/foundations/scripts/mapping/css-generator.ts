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
  ],
} satisfies GeneratorMappingDictionary;
