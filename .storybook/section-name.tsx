import React from 'react';
import { Story } from '@storybook/react';

import { DecoratorFn } from '@storybook/react';

const styles = {
  fullScreen: {
    width: '100%',
    height: '100%',
    padding: '3rem',
    backgroundColor: 'var(--color-background-base)',
  },
};

export const withSectionNameForTheme: DecoratorFn = (Story, context) => {
  const mode = context.globals.theme;
  return (
    <section className={mode} style={{ ...styles.fullScreen }}>
      <Story />
    </section>
  );
};
