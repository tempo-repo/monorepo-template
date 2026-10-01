import { type VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';

export type ExampleViewVariantsType = VariantProps<typeof exampleViewVariants>;

export const exampleViewVariants = cva('', {
  variants: {
    variant: {
      primary: clsx('bg-red-500'),
      secondary: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
