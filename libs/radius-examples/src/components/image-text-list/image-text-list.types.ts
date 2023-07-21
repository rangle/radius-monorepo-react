import {
  ExcludeLargeVariant,
  ExcludeSmallVariant,
  RadiusImageTextItemProps,
} from '../image-text-item/image-text-item.types';

type LargeRadiusImageTextListProps = {
  /** Whether to render the large or small Image Text Item variant */
  variant: 'large';
  /**
   * The ImageTextItems to be rendered in the list.
   *
   * Note: The `variant` prop is not required on the items as it will be
   * inferred from the `variant` prop on the list.
   *
   * */
  items: Array<Omit<ExcludeSmallVariant<RadiusImageTextItemProps>, 'variant'>>;
};

type SmallRadiusImageTextListProps = {
  /** Whether to render the large or small Image Text Item variant */
  variant: 'small';
  /**
   * The ImageTextItems to be rendered in the list.
   *
   * Note: The `variant` prop is not required on the items as it will be
   * inferred from the `variant` prop on the list.
   *
   * */
  items: Array<Omit<ExcludeLargeVariant<RadiusImageTextItemProps>, 'variant'>>;
};

export type RadiusImageTextListProps = {
  /** Optional className to add to the container */
  className?: string;
} & (LargeRadiusImageTextListProps | SmallRadiusImageTextListProps);
