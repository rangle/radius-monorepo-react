import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import { TextAndImage } from '..';

expect.extend(toHaveNoViolations);

describe('<TextAndImage />', () => {
  const renderTestComponent = () => {
    return render(
      <TextAndImage
        title="Hello World"
        body="body text"
        headingLevel="h2"
        src="https://via.placeholder.com/1500"
        alt="placeholder image"
      />
    );
  };

  test('should render', () => {
    const { getByText } = renderTestComponent();
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  test('should have no accessibility violations', async () => {
    const { container } = renderTestComponent();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
