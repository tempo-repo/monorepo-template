import clsx from 'clsx';
import type { ElementType } from 'react';

import type {
  FieldAlikeComponent,
  FieldDedicatedProps,
  FieldProps,
  Morphable,
} from './Field.props';

/**
 * Global field component. Allows to share styles across all field-like
 * components.
 */
export function Field<C extends FieldAlikeComponent>({
  className,
  children,
  as,
  unstyled = false,
  ...props
}: FieldProps<C>) {
  const Component: ElementType = as ?? ('div' as C);
  return (
    <Component
      className={clsx(
        // Nullstyles
        'text-primary-font placeholder:text-primary-font/60 appearance-none bg-transparent',
        {
          // TODO Implement field styles
          [``]: !unstyled,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export type { FieldAlikeComponent, Morphable, FieldDedicatedProps };
