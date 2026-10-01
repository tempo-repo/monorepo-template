import clsx from 'clsx';

import type { HeadingElementType, HeadingProps } from './Heading.props';
import { headingAdditionalClasses, headingSizesMap } from './Heading.props';

export function Heading({
  level,
  className,
  style,
  children,
  ...props
}: HeadingProps) {
  const Comp: HeadingElementType = `h${level}`;
  const wrapperClass: string = headingAdditionalClasses[level];
  const fontSize: string = headingSizesMap[level];

  return (
    <Comp
      className={clsx('leading-[normal]', wrapperClass, className)}
      style={{
        fontSize,
        ...style,
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}
