import React from 'react';

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
