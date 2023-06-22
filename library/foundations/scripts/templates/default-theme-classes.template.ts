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
    console.warn(name);
    if (!isSwitchable({ name, isStatic })) {
      return [];
    }
    const sectionName = parameters[PARAM_SECTION_NAME] ?? name;
    return isDefault && sectionName ? toKebabCase(sectionName) : [];
  });
};

export const renderDefaultThemeClassNames = ({ layers }: TokenLayers) => {
  const defaultLayers = layers.filter((l) => l.isDefault && isSwitchable(l));
  return Buffer.from(`
/** Default class-names to be applied to the body when the page loads */
export const defaultClassNames = [${getDefaultClassNames(defaultLayers)
    .map((l) => `"${l}",`)
    .join('')}];

/** Initial base Path for images */
export const imageBasePath = "${getDefaultAssetPaths(defaultLayers)}";
`);
};
