import React from 'react';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RadiusButton } from '..';

expect.extend(toHaveNoViolations);

describe('<RadiusButton />', () => {
  test('should render', () => {
    const { getByRole } = render(<RadiusButton />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('should render an anchor tag when as is set to "a"', () => {
    const { getByRole } = render(<RadiusButton as={'a'} href="#helloworld" />);
    expect(getByRole('link')).toHaveAttribute('href', '#helloworld');
  });

  test('should have no accessibility violations', async () => {
    const { getByRole } = render(
      <RadiusButton aria-label="Favourite button" />
    );
    expect(await axe(getByRole('button'))).toHaveNoViolations();
  });
});
