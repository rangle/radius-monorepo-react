import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import { TextAndImage, TextAndImageProps } from '..';

expect.extend(toHaveNoViolations);

describe('<TextAndImage />', () => {
  const renderTestComponent = (
    props?: Partial<TextAndImageProps & React.HTMLAttributes<HTMLDivElement>>
  ) => {
    return render(
      <TextAndImage
        title="Hello World"
        body="body text"
        headingLevel="h2"
        src="https://via.placeholder.com/1500"
        alt="placeholder image"
        {...props}
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

  test('should display the correct heading level', () => {
    const { getByText } = renderTestComponent({ headingLevel: 'h3' });
    expect(getByText('Hello World').tagName).toBe('H3');
  });
});
