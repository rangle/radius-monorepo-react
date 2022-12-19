import React from 'react';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RadiusButton, RadiusButtonProps } from '..';

expect.extend(toHaveNoViolations);

describe('<RadiusButton />', () => {
  const props: RadiusButtonProps<'button'> = {
    children: 'Button',
    size: 'medium',
    variant: 'secondary',
    disabled: false,
    onClick: jest.fn(),
  };

  const propsWithHref: RadiusButtonProps<'a'> = {
    href: 'https://www.google.com',
    as: 'a',
    children: 'Button',
    size: 'medium',
    variant: 'primary',
    onClick: jest.fn(),
  };
  test('should render', () => {
    const { getByRole } = render(<RadiusButton {...props} />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('should render an anchor tag when as is set to "a"', () => {
    const { getByRole } = render(<RadiusButton {...propsWithHref} />);
    expect(getByRole('link')).toHaveAttribute('href', propsWithHref.href);
  });

  test('should have no accessibility violations', async () => {
    const { getByRole } = render(
      <RadiusButton {...props} aria-label="Favourite button" />
    );
    expect(await axe(getByRole('button'))).toHaveNoViolations();
  });
});
