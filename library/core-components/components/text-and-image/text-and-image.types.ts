export type TextAndImageProps = {
  preTitle?: string;
  title: string;
  body: string;
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  media?: 'left' | 'right';
  classname?: string;
} & React.HTMLAttributes<HTMLDivElement>;
// TODO: make this polymorphic? (Since it's an autoboxed component)
