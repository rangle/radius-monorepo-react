import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RadiusImageTextList } from '..';

expect.extend(toHaveNoViolations);

describe('<RadiusImageTextList />', () => {
  const renderLargeVariant = () => {
    return render(
      <RadiusImageTextList
        items={[
          {
            alt: 'Descriptive text',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
            header: 'Header 1',
            headingLevel: 'h2',
            src: 'https://via.placeholder.com/1500',
          },
          {
            alt: 'Descriptive text',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
            header: 'Header 2',
            headingLevel: 'h2',
            src: 'https://via.placeholder.com/1500',
          },
        ]}
        variant="large"
      />
    );
  };
  const renderSmallVariant = () => {
    return render(
      <RadiusImageTextList
        items={[
          {
            alt: 'Descriptive text',
            body: 'body 1',
            src: 'https://via.placeholder.com/1500',
          },
          {
            alt: 'Descriptive text',
            body: 'body 2',
            src: 'https://via.placeholder.com/1500',
          },
        ]}
        variant="small"
      />
    );
  };
  test('should render large variant', () => {
    const { getByText } = renderLargeVariant();
    expect(getByText('Header 1')).toBeInTheDocument();
  });
  test('should render small variant', () => {
    const { getByText } = renderSmallVariant();
    expect(getByText('body 1')).toBeInTheDocument();
  });
  test('large variant should have no accessibility violations', async () => {
    const { container } = renderLargeVariant();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  test('small variant should have no accessibility violations', async () => {
    const { container } = renderSmallVariant();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
