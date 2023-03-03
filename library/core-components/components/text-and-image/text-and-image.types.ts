export type TextAndImageProps = {
  /** Optional text above the title */
  preTitle?: string;
  /** Title text */
  title: string;
  /** Body text */
  body: string;
  /** The tag to be used for the title. Should be specified on a case-by-case basis to ensure correct semantics for accessibility */
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Which side of the text the image should be displayed on */
  media?: 'left' | 'right';
  /** The image source */
  src: string;
  /** The image alt text */
  alt?: string;
  /** Optional classname to add to the container */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
// TODO: make this polymorphic? (Since it's an autoboxed component)
