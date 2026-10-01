import { type VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';

export type ButtonVariantsType = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva('', {
  variants: {
    variant: {
      primary: clsx(''),
      danger: clsx(''),
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
