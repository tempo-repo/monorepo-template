import type { ComponentProps, ElementType, ReactNode } from 'react';

export type FieldAlikeComponent = ElementType<{
  className?: string;
  children?: ReactNode;
}>;

/**
 * Defines props for component, that has ``as`` prop.
 */
export type Morphable<C extends ElementType> = ComponentProps<C> & {
  as?: C;
};

export interface FieldDedicatedProps {
  unstyled?: boolean;
}

export type FieldProps<C extends FieldAlikeComponent = 'div'> = Morphable<C> &
  FieldDedicatedProps;
