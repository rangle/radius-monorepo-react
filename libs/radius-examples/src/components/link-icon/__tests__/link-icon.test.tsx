import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AccountCircle } from '@rangle/radius-foundations';

import { RadiusLinkIcon } from '..';

expect.extend(toHaveNoViolations);

describe('<RadiusLinkIcon />', () => {
  test('should render', () => {
    const { getByRole } = render(
      <RadiusLinkIcon href="#" icon={AccountCircle} size={{ css: '24px' }} />
    );
    expect(getByRole('link')).toBeInTheDocument();
  });

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <RadiusLinkIcon
        href="#"
        aria-label="Descriptive text"
        icon={AccountCircle}
        size={{ css: '24px' }}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
