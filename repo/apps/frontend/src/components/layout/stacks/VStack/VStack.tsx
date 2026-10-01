import clsx from 'clsx';
import type { ElementType } from 'react';

import type { StackElementType, VStackProps } from './VStack.props';
import { vStackVariants } from './VStack.variants';

export function VStack<C extends StackElementType = 'div'>({
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
      className={clsx(
        'flex flex-col',
        vStackVariants({ alignment }),
        className,
      )}
      style={{
        gap: spacing,
        ...style,
      }}
      {...props}
    />
  );
}
