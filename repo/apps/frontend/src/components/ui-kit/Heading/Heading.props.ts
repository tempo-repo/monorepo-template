import clsx from 'clsx';
import type { ComponentProps, ElementType } from 'react';

export type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5;
} & ComponentProps<'h1'>;

type HeadingLevel = HeadingProps['level'];

export type HeadingElementType = Extract<ElementType, `h${HeadingLevel}`>;

// TODO Change heading sizes
export const headingSizesMap: Record<HeadingLevel, string> = {
  1: '3.4rem',
  2: '2.8rem',
  3: '2.2rem',
  4: '2.0rem',
  5: '1.7rem',
};

// TODO Change font weights here
export const headingAdditionalClasses: Record<HeadingLevel, string> = {
  1: clsx('font-bold'),
  2: clsx('font-bold'),
  3: clsx('font-bold'),
  4: clsx('font-bold'),
  5: clsx('font-bold'),
};
