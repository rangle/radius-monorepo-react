import React from 'react';
import { Story } from '@storybook/react';

import { DecoratorFn } from '@storybook/react';

const styles = {
  backgroundColor: 'var(--color-background-base)',
};

export const withSectionNameForTheme: DecoratorFn = (Story, context) => {
  const mode = context.globals.theme;
  return (
    <section className={mode} style={{ ...styles }}>
      <Story />
    </section>
  );
};
