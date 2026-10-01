import clsx from 'clsx';
import type { VariableFC } from 'xenopomp-essentials';

/**
 * This component works similar to SwiftUI`s Spacer struct.
 * Grows inside flex container.
 *
 * @constructor
 *
 * @example
 * // UI
 * Logo <----- Spacer -----> Nav
 */
export const Spacer: VariableFC<'div', unknown, 'children'> = ({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}) => {
  return (
    <div
      className={clsx('flex-grow', className)}
      aria-hidden={ariaHidden}
      {...props}
    >
      <></>
    </div>
  );
};
