import { Preview } from '@storybook/react';
import { RadiusTheme } from './theme';
import { withSectionNameForTheme } from './section-name';

export const globalTypes: Preview['globalTypes'] = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light-mode',
    toolbar: {
      // Array of plain string values or MenuItem shape (see below)
      items: [
        { title: 'Light Mode', value: 'light-mode', icon: 'sun' },
        { title: 'Dark Mode', value: 'dark-mode', icon: 'moon' },
      ],
      // Property that specifies if the name of the item will be displayed
      name: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
  brand: {
    name: 'Brand',
    description: 'Global brand for components',
    defaultValue: 'photostop',
    toolbar: {
      // Array of plain string values or MenuItem shape (see below)
      items: [
        { title: 'Photostop', value: 'photostop', icon: 'camera' },
        { title: 'Saddles', value: 'saddles', icon: 'photo' },
      ],
      // Property that specifies if the name of the item will be displayed
      name: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const parameters: Preview['parameters'] = {
  backgrounds: { disable: true },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: RadiusTheme,
  },
};

export const decorators: Preview['decorators'] = [withSectionNameForTheme];
