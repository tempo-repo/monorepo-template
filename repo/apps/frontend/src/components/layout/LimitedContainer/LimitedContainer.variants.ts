import { type VariantProps, cva } from 'class-variance-authority';

export type LimitedContainerVariantsType = VariantProps<
  typeof limitedContainerVariants
>;

export const limitedContainerVariants = cva('', {
  variants: {
    align: {
      start: 'mr-auto ml-[--insets]',
      end: 'ml-auto mr-[--insets]',
      center: 'mx-auto',
    },
  },
  defaultVariants: {
    align: 'center',
  },
});
