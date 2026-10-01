import clsx from 'clsx';
import type { CSSProperties, ElementType } from 'react';

import type { LimitedContainerProps } from './LimitedContainer.props';
import { limitedContainerVariants } from './LimitedContainer.variants';

export function LimitedContainer<
  AsType extends ElementType<{
    className?: string;
    style?: CSSProperties;
  }> = 'section',
>({
  as,
  maxSize = '500px',
  insets = '2.5rem',
  className,
  style,
  align,
  ...props
}: LimitedContainerProps<AsType>) {
  // Default element type is section.
  const Element: ElementType = as ?? 'section';
  return (
    <Element
      style={{
        '--max-size': maxSize,
        '--insets': insets,
        width: `min(var(--max-size), calc(100% - 2 * var(--insets)))`,
        ...style,
      }}
      className={clsx(
        limitedContainerVariants({
          align,
        }),
        className,
      )}
      {...props}
    />
  );
}
