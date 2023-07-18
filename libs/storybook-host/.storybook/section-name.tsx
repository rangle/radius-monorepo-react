import React from 'react';
import { Decorator } from '@storybook/react';
import { radiusTokens } from '@rangle/radius-foundations';

const styles = {
  backgroundColor: `var(${radiusTokens.semanticTheme.color.actions.default.primaryForeground})`,
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
  const { theme, brand } = context.globals;
  removeClassesAndAddTheme(theme);
  return (
    <section className={`${theme} ${brand}`} style={{ ...styles }}>
      <Story />
    </section>
  );
};
