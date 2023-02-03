import React from 'react';
import { Story } from '@storybook/react';
import { RadiusTheme } from './theme';
import { withSectionNameForTheme } from './section-name';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light-mode',
    toolbar: {
      icon: 'circlehollow',
      // Array of plain string values or MenuItem shape (see below)
      items: ['light-mode', 'dark-mode'],
      // Property that specifies if the name of the item will be displayed
      name: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const parameters = {
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

export const decorators = [withSectionNameForTheme];
