import React, { forwardRef } from 'react';
// import { cx } from '@emotion/css';
// import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

// import { useStyles } from './nav.styles';
import { RadiusFooterComponent, RadiusFooterProps } from './footer.types';
import { PolymorphicRef } from '../../utils';
import { RadiusAutoLayout } from '../auto-layout/auto-layout';

/**
 * TODO: Add description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/6wmTw9t9kiutJssWjO890d/Footer?type=design&node-id=1-2880)
 */
export const RadiusFooter: RadiusFooterComponent = forwardRef(
  <C extends React.ElementType = 'footer'>(
    {
      as,
      // logos,
      // navItems,
      // linkIcons,
      // socials,
      className,
      ...rest
    }: RadiusFooterProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Component = as || 'nav';

    // const {
    //   styles,
    //   navContainer,
    //   menu,
    //   toggleButton,
    //   secondaryActionsContainer,
    // } = useStyles({
    //   isOpen,
    // });

    return (
      <Component ref={ref} className={className} {...rest}>
        <RadiusAutoLayout>hi</RadiusAutoLayout>
      </Component>
    );
  }
);
