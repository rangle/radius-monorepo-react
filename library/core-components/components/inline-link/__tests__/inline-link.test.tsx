import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RadiusInlineLink } from '..';

expect.extend(toHaveNoViolations);

describe('<RadiusInlineLink />', () => {
  test('should render', () => {
    const { getByRole } = render(
      <RadiusInlineLink href="#" size={{ css: '24px' }}>
        test
      </RadiusInlineLink>
    );
    expect(getByRole('link')).toBeInTheDocument();
  });

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <RadiusInlineLink
        href="#"
        aria-label="Descriptive text"
        size={{ css: '24px' }}
      >
        test
      </RadiusInlineLink>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
