import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RadiusImageTextItem } from '..';
import { RadiusImageTextItemProps } from '../image-text-item.types';

expect.extend(toHaveNoViolations);

describe('<RadiusImageTextItem />', () => {
  type ExcludeSmallVariant<T> = T extends { variant: 'small' } ? never : T;
  type ExcludeLargeVariant<T> = T extends { variant: 'large' } ? never : T;

  const renderLargeVariant = (
    props?: Partial<ExcludeSmallVariant<RadiusImageTextItemProps>>
  ) => {
    return render(
      <RadiusImageTextItem
        header="Hello World"
        variant="large"
        body="body text"
        headingLevel="h2"
        src="https://via.placeholder.com/1500"
        alt="placeholder image"
        {...props}
      />
    );
  };

  const renderSmallVariant = (
    props?: Partial<ExcludeLargeVariant<RadiusImageTextItemProps>>
  ) => {
    return render(
      <RadiusImageTextItem
        variant="small"
        body="body text"
        src="https://via.placeholder.com/1500"
        alt="placeholder image"
        {...props}
      />
    );
  };

  test('should render large variant', () => {
    const { getByText } = renderLargeVariant();
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  test('should render small variant', () => {
    const { getByText } = renderSmallVariant();
    expect(getByText('body text')).toBeInTheDocument();
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

  test('should display the correct heading level for large variant', () => {
    const { getByText } = renderLargeVariant({ headingLevel: 'h3' });
    expect(getByText('Hello World').tagName).toBe('H3');
  });
});
