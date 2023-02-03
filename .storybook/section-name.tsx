import React from 'react';
import { Story } from '@storybook/react';

import { DecoratorFn } from '@storybook/react';

const styles = {
  backgroundColor: 'var(--color-background-base)',
};

const removeClassesAndAddTheme = (mode: string) => {
  const docsRoot = document.getElementById("docs-root");
  const root = document.getElementById("root");
  docsRoot?.classList.forEach((item) => docsRoot?.classList.remove(item));
  root?.classList.forEach((item) => root?.classList.remove(item));
  docsRoot?.classList.add(mode);
  root?.classList.add(mode);
};

export const withSectionNameForTheme: DecoratorFn = (Story, context) => {
  const mode = context.globals.theme;
  removeClassesAndAddTheme(mode);
  return (
    <section className={mode} style={{ ...styles }}>
      <Story />
    </section>
  );
};
