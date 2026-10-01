import clsx from 'clsx';
import type { ComponentProps, ElementType, ReactNode } from 'react';

import styles from './ZStack.module.scss';

export function ZStack<A extends ElementWithFields = 'div'>({
  as,
  children,
  className,
  ...props
}: ComponentProps<A> & {
  as?: A;
}) {
  const Comp: ElementWithFields = as ?? 'div';
  return (
    <Comp
      className={clsx(styles.zStack, className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

type ElementWithFields = ElementType<{
  children?: ReactNode;
  className?: string;
}>;
