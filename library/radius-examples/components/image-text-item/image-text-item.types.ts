type LargeRadiusImageTextItemProps = {
  /** Whether to render the large or small Image Text Item variant */
  variant: 'large';
  /** Header text. */
  header: string;
  /** The tag to be used for the title. Should be specified on a case-by-case basis to ensure correct semantics for accessibility. */
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

type SmallRadiusImageTextItemProps = {
  /** Whether to render the large or small Image Text Item variant */
  variant: 'small';
  /** Doesn't exist on small variant */
  header?: never;
  /** Doesn't exist on small variant */
  headingLevel?: never;
};

export type RadiusImageTextItemProps = {
  /** Body text */
  body: string;
  /** Which side of the text the image should be displayed on */
  imageAlignment?: 'left' | 'right';
  /** The image source */
  src: string;
  /** The image alt text */
  alt: string;
  /** Optional className to add to the container */
  className?: string;
  /** Optional children to render after other content */
  children?: React.ReactNode;
} & (LargeRadiusImageTextItemProps | SmallRadiusImageTextItemProps);

export type ExcludeSmallVariant<T> = T extends { variant: 'small' } ? never : T;
export type ExcludeLargeVariant<T> = T extends { variant: 'large' } ? never : T;
