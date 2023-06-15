import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RadiusHero } from '..';

expect.extend(toHaveNoViolations);

describe('<RadiusHero />', () => {
  test('should render', () => {
    const { getByText } = render(
      <RadiusHero
        header="Header"
        eyebrow="Eyebrow"
        buttonLabel="Action"
        image={<img src="https://via.placeholder.com/1500" alt="Description" />}
        ctaUrl="#"
      />
    );
    expect(getByText('Action')).toHaveTextContent('Action');
  });

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <RadiusHero
        header="Header"
        eyebrow="Eyebrow"
        buttonLabel="Action"
        image={<img src="https://via.placeholder.com/1500" alt="Description" />}
        ctaUrl="#"
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  test('should hide the button if `buttonLabel` is not provided', () => {
    const { queryByText } = render(
      <RadiusHero
        header="Header"
        eyebrow="Eyebrow"
        image={<img src="https://via.placeholder.com/1500" alt="Description" />}
        ctaUrl="#"
      />
    );
    expect(queryByText('Action')).toBeNull();
  });

  test('should hide the button if `ctaUrl` is not provided', () => {
    const { queryByText } = render(
      <RadiusHero
        header="Header"
        eyebrow="Eyebrow"
        image={<img src="https://via.placeholder.com/1500" alt="Description" />}
        buttonLabel="Action"
      />
    );
    expect(queryByText('Action')).toBeNull();
  });
});
