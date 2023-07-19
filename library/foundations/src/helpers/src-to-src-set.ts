import { config } from '../../generator-config';

/** expands `src` to `srcSet` using the configured image sized */
export const srcToSrcSet = (src: string) => {
  const withoutExtension = src.replace('.webp', '');
  const srcSet = config.imageSizes
    .map((s) => `${withoutExtension}_w${s}.webp ${s}w`)
    .join(', ');

  return {
    srcSet,
    src,
  };
};
