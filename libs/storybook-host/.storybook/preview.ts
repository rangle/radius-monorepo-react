import { Preview } from '@storybook/react';
import { RadiusTheme } from './theme';
import { withSectionNameForTheme } from './section-name';

const customViewports = {
  iphoneMini: {
    name: 'iPhone Mini',
    styles: {
      width: '360px',
      height: '780px',
    },
  },
  ipadMini: {
    name: 'iPad Mini',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  googleP2XL: {
    name: 'Google Pixel 2 XL',
    styles: {
      width: '411px',
      height: '823px',
    },
  },
  iphone12: {
    name: 'iPhone 12',
    styles: {
      width: '390px',
      height: '844px',
    },
  },
  iphone12ProMax: {
    name: 'iPhone 12 Pro Max',
    styles: {
      width: '428px',
      height: '926px',
    },
  },
  galaxyS9: {
    name: 'Samsung Galaxy S9',
    styles: {
      width: '360px',
      height: '740px',
    },
  },
};

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
        { title: 'Healthcare', value: 'healthcare' },
        { title: 'Wellness', value: 'wellness' },
      ],
      // Property that specifies if the name of the item will be displayed
      name: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const parameters: Preview['parameters'] = {
  viewport: { viewports: customViewports },
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
