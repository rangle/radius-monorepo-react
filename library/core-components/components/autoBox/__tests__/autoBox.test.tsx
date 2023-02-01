import React from 'react';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RadiusAutoBox } from '..';
import { RadiusButton } from '../../button';

expect.extend(toHaveNoViolations);

describe('<RadiusButton />', () => {
  test('should render and should render if there is a child', () => {
    const rendered = render(
      <RadiusAutoBox className="parentAutoBox">
        <RadiusAutoBox className="childAutoBox"></RadiusAutoBox>
      </RadiusAutoBox>
    );
    expect(
      rendered.container.getElementsByClassName('parentAutoBox')[0]
    ).toBeInTheDocument();
    expect(
      rendered.container.getElementsByClassName('childAutoBox')[0]
    ).toBeInTheDocument();
  });

  test('should be polymorphic', () => {
    const { getByRole } = render(
      <RadiusAutoBox as="button" className="myAutoBox" />
    );
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('should accept any type of component to be polymorphic', () => {
    const { getByRole } = render(
      <RadiusAutoBox as={RadiusButton} className="myAutoBox" />
    );
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('should have no accessibility violations', async () => {
    const { container } = render(<RadiusAutoBox className="myAutoBox" />);
    expect(
      await axe(container.getElementsByClassName('myAutoBox')[0])
    ).toHaveNoViolations();
  });
});
