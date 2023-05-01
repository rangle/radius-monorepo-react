import React from 'react';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RadiusAutoLayout } from '..';
import { RadiusButton } from '../../button';

expect.extend(toHaveNoViolations);

describe('<RadiusButton />', () => {
  test('should render and should render if there is a child', () => {
    const rendered = render(
      <RadiusAutoLayout className="parentAutoLayout">
        <RadiusAutoLayout className="childAutoLayout"></RadiusAutoLayout>
      </RadiusAutoLayout>
    );
    expect(
      rendered.container.getElementsByClassName('parentAutoLayout')[0]
    ).toBeInTheDocument();
    expect(
      rendered.container.getElementsByClassName('childAutoLayout')[0]
    ).toBeInTheDocument();
  });

  test('should be polymorphic', () => {
    const { getByRole } = render(
      <RadiusAutoLayout as="button" className="myAutoLayout" />
    );
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('should accept any type of component to be polymorphic', () => {
    const { getByRole } = render(
      <RadiusAutoLayout as={RadiusButton} className="myAutoLayout" />
    );
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('should have no accessibility violations', async () => {
    const { container } = render(<RadiusAutoLayout className="myAutoLayout" />);
    expect(
      await axe(container.getElementsByClassName('myAutoLayout')[0])
    ).toHaveNoViolations();
  });
});
