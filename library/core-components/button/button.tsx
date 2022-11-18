import React, {
  FC,
  PropsWithChildren,
  ComponentPropsWithoutRef,
  useMemo,
} from 'react';

import { getStyles, StylesProps } from './button.styles';

export type RadiusButtonProps = PropsWithChildren<{
  variant?: StylesProps['variant'];
}> &
  ComponentPropsWithoutRef<'button'>;

export const RadiusButton: FC<RadiusButtonProps> = ({
  children,
  variant,
  ...rest
}) => {
  // const className = useMemo(
  //   () =>
  //     getStyles({
  //       variant,
  //     }),
  //   [variant]
  // );
  return <button /* className={className} */ {...rest}>{children}</button>;
};
