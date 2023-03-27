import React from 'react';

/**
 * A utility function that returns a custom svg component with the given path. This is useful when you
 * want to use an icon that is not in the library.
 *
 * It has the same signature as the `component` prop of the `RadiusIcon` component.
 */
export const withIcon = (path: string) => {
  const CustomIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={path} />
    </svg>
  );

  return CustomIcon;
};
