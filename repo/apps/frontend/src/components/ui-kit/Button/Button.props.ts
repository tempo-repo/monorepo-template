import type { LucideIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

import type { Field, FieldAlikeComponent, Morphable } from '@ui/kit';

import type { ButtonVariantsType } from './Button.variants';

type MapIconNames<T> = {
  [Key in keyof T as `${Lowercase<Extract<Key, string>>}Icon`]?:
    | T[Key]
    | undefined
    | null;
};

type Icons = MapIconNames<Record<'leading' | 'trailing', LucideIcon>>;

export type ButtonProps<C extends FieldAlikeComponent = 'button'> =
  Morphable<C> &
    Icons &
    ButtonVariantsType &
    Pick<ComponentProps<typeof Field>, 'unstyled'>;
