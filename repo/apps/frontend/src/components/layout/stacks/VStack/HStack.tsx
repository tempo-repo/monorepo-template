import clsx from 'clsx';
import type { ElementType } from 'react';

import type { StackElementType, VStackProps } from './VStack.props';
import { hStackVariants } from './VStack.variants';

export function HStack<C extends StackElementType = 'div'>({
  className,
  style,
  as,
  spacing,
  alignment,
  ...props
}: VStackProps<C>) {
  const Comp: ElementType = as ?? ('div' as C);
  return (
    <Comp
      className={clsx('flex', hStackVariants({ alignment }), className)}
      style={{
        gap: spacing,
        ...style,
      }}
      {...props}
    />
  );
}
