import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AccountCircle } from '@rangle/radius-foundations/generated/icons';

import { RadiusLinkIcon } from '..';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

expect.extend(toHaveNoViolations);

describe('<RadiusLinkIcon />', () => {
  test('should render', () => {
    const { getByRole } = render(
      <RadiusLinkIcon
        href="#"
        icon={AccountCircle}
        size={radiusTokens.component.sizing.linkIcon.small}
      />
    );
    expect(getByRole('link')).toBeInTheDocument();
  });

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <RadiusLinkIcon
        href="#"
        aria-label="Descriptive text"
        icon={AccountCircle}
        size={radiusTokens.component.sizing.linkIcon.small}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
