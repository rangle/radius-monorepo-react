import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toHaveNoViolations, axe } from 'jest-axe';

import { Typography } from '..';

expect.extend(toHaveNoViolations);

describe('<Typography />', () => {
  test('should render', () => {
    const { getByText } = render(<Typography>Hello World</Typography>);
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  test('should render a <p> tag by default', () => {
    const { container } = render(<Typography>Hello World</Typography>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  test('should be polymorphic', () => {
    const { container } = render(<Typography as="h1">Hello World</Typography>);
    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  test('should be left aligned by default', () => {
    const { getByText } = render(<Typography>Hello World</Typography>);
    expect(getByText('Hello World')).toHaveStyle('text-align: left');
  });

  test('should have no accessibility violations', async () => {
    const { getByText } = render(<Typography>Hello World</Typography>);
    expect(await axe(getByText('Hello World'))).toHaveNoViolations();
  });
});
