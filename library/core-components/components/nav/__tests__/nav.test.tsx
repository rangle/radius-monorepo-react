import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RadiusNav } from '..';

expect.extend(toHaveNoViolations);

describe('<RadiusNavItem />', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(<RadiusNav />);
    expect(await axe(container)).toHaveNoViolations();
  });
});