import type { CSSProperties, ComponentProps, ElementType } from 'react';

import type { VStackVariantsType } from './VStack.variants';

export type StackElementType = ElementType<{
  className?: string;
  style?: CSSProperties;
}>;

export type VStackProps<C extends StackElementType = 'div'> =
  ComponentProps<C> & {
    as?: C;
    // Alias for CSSProperties.gap
    spacing?: CSSProperties['gap'];
  } & VStackVariantsType;

export type StackRelatedProps = Pick<VStackProps<'div'>, 'spacing'>;
