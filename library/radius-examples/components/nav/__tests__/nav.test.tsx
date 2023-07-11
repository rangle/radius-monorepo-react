import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import {
  Github,
  Figma,
  Instagram,
  LinkedIn,
} from '@rangle/radius-foundations/generated/icons';

import { RadiusNav } from '..';

expect.extend(toHaveNoViolations);

describe('<RadiusNavItem />', () => {
  const renderTestComponent = () => {
    return render(
      <RadiusNav
        logos={
          <>
            <p>logo 1</p>
          </>
        }
        navItems={[
          {
            label: 'Menu Item 1',
            href: '#',
            'aria-label': 'test',
            selected: true,
          },
          { label: 'Menu Item 2', href: '#', 'aria-label': 'test' },
        ]}
        linkIcons={[
          { icon: Github, href: '#', 'aria-label': 'test' },
          { icon: Figma, href: '#', 'aria-label': 'test' },
        ]}
        socials={[
          { icon: Instagram, href: '#', 'aria-label': 'test' },
          { icon: LinkedIn, href: '#', 'aria-label': 'test' },
        ]}
      />
    );
  };

  test('should render', () => {
    const { getByText } = renderTestComponent();
    expect(getByText('Menu Item 1')).toBeInTheDocument();
  });

  test('should have no accessibility violations', async () => {
    const { container } = renderTestComponent();
    expect(await axe(container)).toHaveNoViolations();
  });
});
