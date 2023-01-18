import { addons } from '@storybook/addons';

import { RadiusTheme } from './theme';

addons.setConfig({
  theme: RadiusTheme,
  sidebar: {
    showRoots: true,
  },
});

