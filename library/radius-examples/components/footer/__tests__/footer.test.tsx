import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import {
  Github,
  Figma,
  ArrowRight,
} from '@rangle/radius-foundations/generated/icons';

import { RadiusFooter } from '..';

expect.extend(toHaveNoViolations);

describe('<RadiusFooter />', () => {
  const renderTestComponent = () => {
    return render(
      <RadiusFooter
        connectButtonProps={{
          as: 'a',
          children: 'Get in touch',
          href: '#',
          rightIcon: ArrowRight,
        }}
        connectLinkIcons={[
          {
            'aria-label': 'Descriptive text',
            href: '#',
            icon: Github,
          },
          {
            'aria-label': 'Descriptive text',
            href: '#',
            icon: Figma,
          },
        ]}
        copyright="© Rangle.io, 2023.  All rights reserved."
        inquiriesHeader="General Inquiries"
        inquiriesLinks={[
          {
            children: 'info@rangle.io',
            href: '#',
          },
          {
            children: '1 416-737-1555',
            href: '#',
          },
        ]}
        logo={
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a href="#">
            <img
              alt="Rangle Logo"
              src="static/media/radius/assets/rangle-logo-light.svg"
            />
          </a>
        }
        newsLetterHeader="Our newsletter"
        newsLetterLinks={[
          {
            children: 'Sign up',
            href: '#',
            iconRight: ArrowRight,
          },
        ]}
        pageLinks={[
          {
            children: 'Design',
            href: '#',
            iconRight: ArrowRight,
          },
          {
            children: 'Development',
            href: '#',
            iconRight: ArrowRight,
          },
        ]}
        privacyPolicy={{
          children: 'Privacy Policy',
          href: '#',
        }}
      />
    );
  };

  test('should render', () => {
    const { getByText } = renderTestComponent();
    expect(getByText('General Inquiries')).toBeInTheDocument();
  });

  test('should have no accessibility violations', async () => {
    const { container } = renderTestComponent();
    expect(await axe(container)).toHaveNoViolations();
  });
});
