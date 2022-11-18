import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RadiusButton, RadiusButtonProps } from '..';

expect.extend(toHaveNoViolations);

describe('<RadiusButton />', () => {
  test('should render', () => {

  });

  test('should have no accessibility violations', () => {

  });
});
