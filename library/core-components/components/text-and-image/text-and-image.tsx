import React, { useMemo, forwardRef } from 'react';
import { PolymorphicComponentPropWithRef } from '../../utils/polymorphic.types';

import { TextAndImageProps } from './text-and-image.types';
// import { getStyles } from './text-and-image.styles';
import { elementAndProps } from '../../utils/polymorphic.utils';
import { RadiusAutoBox } from '../auto-box/auto-box';
import { Typography } from '../typography/typography';

// type RadiusButtonTag = React.ElementType;
// export type RadiusTextAndImageProps = PolymorphicComponentPropWithRef<
//   React.ElementType,
//   TextAndImageProps
// >;

export const TextAndImage = forwardRef<React.ElementType, TextAndImageProps>(
  ({ preTitle, title, headingLevel, body }, ref) => {
    // const element = elementAndProps(rest, ref, 'div');
    // const styles = useMemo(() => getStyles(rest), [rest]);

    return (
      <RadiusAutoBox
        ref={ref}
        padding={{
          top: 'var(--spacing-core-space-26x)',
          bottom: 'var(--spacing-core-space-26x)',
          left: 'var(--spacing-core-space-18x)',
          right: 'var(--spacing-core-space-18x)',
        }}
        space="var(--spacing-core-space-6x)"
        fill="var(--color-background-subtle)"
        width="fill-parent"
      >
        <RadiusAutoBox width="fill-parent">
          <RadiusAutoBox
            as="img"
            src="https://via.placeholder.com/1500"
            alt=""
            width="fill-parent"
          />
        </RadiusAutoBox>
        <RadiusAutoBox
          space="var(--spacing-core-space-12x)"
          direction="vertical"
        >
          {!!preTitle && (
            <Typography
              font="var(--typography-heading-md)"
              color="var(--color-text-on-subtle-primary)"
            >
              {preTitle}
            </Typography>
          )}
          <Typography
            as={headingLevel}
            font="var(--typography-heading-xxl)"
            color="var(--color-text-on-subtle-primary)"
          >
            {title}
          </Typography>
          <Typography
            font="var(--typography-body-xl)"
            color="var(--color-text-on-subtle-secondary)"
          >
            {body}
          </Typography>
        </RadiusAutoBox>
      </RadiusAutoBox>
    );
  }
);
