import React from 'react';
import { Decorator } from '@storybook/react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

const styles = {
  backgroundColor: `var(${radiusTokens.mode.color.actions.default.primaryForeground})`,
};

const removeClassesAndAddTheme = (mode: string) => {
  const docsRoot = document.getElementById('docs-root');
  const root = document.getElementById('root');
  docsRoot?.classList.forEach((item) => docsRoot?.classList.remove(item));
  root?.classList.forEach((item) => root?.classList.remove(item));
  docsRoot?.classList.add(mode);
  root?.classList.add(mode);
};

export const withSectionNameForTheme: Decorator = (Story, context) => {
  const mode = context.globals.theme;
  removeClassesAndAddTheme(mode);
  return (
    <section className={mode} style={{ ...styles }}>
      <Story />
    </section>
  );
};
