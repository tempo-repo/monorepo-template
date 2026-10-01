import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import styles from '@/components/layout/stacks/Alignment.module.scss';

/**
 * Creates cva variants for VStack or HStack.
 */
function createStackAlignment(masterClass: string) {
  return cva(clsx(styles.container, masterClass), {
    variants: {
      alignment: {
        // Top
        topLeading: clsx(styles.topLeading),
        top: clsx(styles.top),
        topTrailing: clsx(styles.topTrailing),
        // Center
        leading: clsx(styles.leading),
        center: clsx(styles.center),
        trailing: clsx(styles.trailing),
        // Bottom
        bottomLeading: clsx(styles.bottomLeading),
        bottom: clsx(styles.bottom),
        bottomTrailing: clsx(styles.bottomTrailing),
      },
    },
    defaultVariants: {
      alignment: undefined,
    },
  });
}

export const vStackVariants = createStackAlignment(styles.vstack!);
export type VStackVariantsType = VariantProps<typeof vStackVariants>;

export const hStackVariants = createStackAlignment(styles.hstack!);
export type HStackVariantsType = VariantProps<typeof hStackVariants>;
