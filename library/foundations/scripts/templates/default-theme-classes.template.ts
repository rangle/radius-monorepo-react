/*
   TEMPLATE FOR DEFAULT CSS THEME CLASS NAMES
   Generates a TS files that contains the default theme classe names
   to apply to the body
*/
import { PARAM_SECTION_NAME } from '../lib/token-parser';
import { toKebabCase } from '../lib/token-parser.utils';
import { TokenLayers, TokenLayer } from '../lib/token-parser.types';

const getDefaultClassNames = (layers: TokenLayer[]) => {
  return layers.flatMap(({ name, isDefault, parameters }) => {
    console.warn(name);
    if (
      ['core', 'components--components'].includes(name) ||
      name.startsWith('breakpoint-')
    ) {
      return [];
    }
    const sectionName = parameters[PARAM_SECTION_NAME] ?? name;
    return isDefault && sectionName ? toKebabCase(sectionName) : [];
  });
};

export const renderDefaultThemeClassNames = ({ layers }: TokenLayers) =>
  Buffer.from(`
/** Default class-names to be applied to the body when the page loads */
export const defaultClassNames = [${getDefaultClassNames(layers)
    .map((l) => `"${l}",`)
    .join('')}];
`);
