/*
   TEMPLATE FOR DEFAULT CSS THEME CLASS NAMES
   Generates a TS files that contains the default theme classe names
   to apply to the body
*/
import { PARAM_SECTION_NAME } from '../lib/token-parser';
import { toKebabCase } from '../lib/token-parser.utils';
import { TokenLayers, TokenLayer } from '../lib/token-parser.types';

const isSwitchable = ({
  name,
  isStatic,
}: Pick<TokenLayer, 'name' | 'isStatic'>) =>
  !isStatic && !name.startsWith('breakpoint-');

/** Return the event or brand specific path */
const getDefaultAssetPaths = (defaultLayers: TokenLayer[]) => {
  const segements = defaultLayers
    .map(({ name }) => name.split('--'))
    .filter(([_, value]) => value !== undefined);
  const event = segements.find(([group]) => group.endsWith('event'));
  if (event) {
    return event.join('/');
  }
  return segements.find(([group]) => group === 'brand')?.join('/');
};

const getDefaultClassNames = (defaultLayers: TokenLayer[]) => {
  return defaultLayers.flatMap(({ name, isStatic, isDefault, parameters }) => {
    if (!isSwitchable({ name, isStatic })) {
      return [];
    }
    const sectionName = parameters[PARAM_SECTION_NAME] ?? name;
    return isDefault && sectionName ? toKebabCase(sectionName) : [];
  });
};

export const renderDefaultThemeSettings = ({ layers }: TokenLayers) => {
  const defaultLayers = layers.filter((l) => l.isDefault && isSwitchable(l));
  const brand = defaultLayers
    .find(({ name }) => name.startsWith('brand--'))
    ?.name.replace('brand--', '');
  return Buffer.from(`
// Variables for the default theme the page should use

/** Default class-names to be applied to the body when the page loads */
export const defaultClassNames = [${getDefaultClassNames(defaultLayers)
    .map((l) => `"${l}",`)
    .join('')}];

/** 
 * Initial base Path for images
 * 
 * \`imageBasePath\` is event-specific, so it won't work for images
 * that are not event-specific - use \`brand\` for those
 */
export const imageBasePath = "${getDefaultAssetPaths(defaultLayers)}";

/** Default brand of the initially rendered theme  */
export const defaultBrand = ${brand ? `"${brand}"` : 'undefined'};
`);
};
