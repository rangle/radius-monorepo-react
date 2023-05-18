import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RadiusLinkButton } from '..';

expect.extend(toHaveNoViolations);

describe('<RadiusLinkButton />', () => {
  test('should render', () => {
    const { getByRole } = render(
      <RadiusLinkButton href="#">test</RadiusLinkButton>
    );
    expect(getByRole('link')).toBeInTheDocument();
  });

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <RadiusLinkButton href="#">test</RadiusLinkButton>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
