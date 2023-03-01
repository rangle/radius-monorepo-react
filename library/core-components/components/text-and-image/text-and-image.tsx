import React, { useMemo, forwardRef } from 'react';
import { PolymorphicComponentPropWithRef } from '../../utils/polymorphic.types';

import { TextAndImageProps } from './text-and-image.types';
import { getStyles } from './text-and-image.styles';
import { elementAndProps } from '../../utils/polymorphic.utils';
import { RadiusAutoBox } from '../auto-box/auto-box';

// import tokenLayers from '../../foundations/generated/token-layers-1.0.1';

// type RadiusButtonTag = React.ElementType;
// export type RadiusTextAndImageProps = PolymorphicComponentPropWithRef<
//   React.ElementType,
//   TextAndImageProps
// >;

export const TextAndImage = forwardRef<React.ElementType, TextAndImageProps>(
  ({ preTitle, title, body }, ref) => {
    // const element = elementAndProps(rest, ref, 'div');
    // const styles = useMemo(() => getStyles(rest), [rest]);
    return (
      <RadiusAutoBox
        // className={`${styles} ${className || ''}`}
        // {...element.props}
        ref={ref}
      >
        <RadiusAutoBox
          as="img"
          src="https://via.placeholder.com/1500"
          alt=""
          width="fill-parent"
        />
        <RadiusAutoBox
          // TODO: get space token from library/foundations/generated/token-layers-1.0.1.json
          space={48}
          direction="vertical"
        >
          {!!preTitle && (
            <RadiusAutoBox
              as="p"
              style={{
                color: 'var(--color-text-on-subtle-primary)',
                // note: font tokens not working correctly:
                // - font asset is named `Riforma` but token specifies `Riforma LL`
                // - `font-weight` value is provided as `Regular` but should be `normal`

                // font: 'var(--typography-heading-md)',
                font: 'Normal 1.5rem/150% Riforma LL',
              }}
              // style={{ color: 'red' }}
            >
              {preTitle}
            </RadiusAutoBox>
          )}
          {/* TODO: make heading level a prop */}
          <RadiusAutoBox
            as="h2"
            style={{
              color: 'var(--color-text-on-subtle-primary)',
              // font: 'var(--typography-heading-xxl)',
              font: 'bold 2.5rem/100% Riforma LL',
            }}
          >
            {title}
          </RadiusAutoBox>
          <RadiusAutoBox
            as="p"
            style={{
              color: 'var(--color-text-on-subtle-secondary)',
              // font: 'var(--typography-body-xl)',
              font: 'normal 1.5rem/150% Riforma LL',
            }}
          >
            {body}
          </RadiusAutoBox>
        </RadiusAutoBox>
      </RadiusAutoBox>
    );
  }
);
