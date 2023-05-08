import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RadiusLinkIcon } from '..';

expect.extend(toHaveNoViolations);

describe('<RadiusLinkIcon />', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(<RadiusLinkIcon />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
