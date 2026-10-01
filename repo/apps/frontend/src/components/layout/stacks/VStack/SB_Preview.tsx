import clsx from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

import { For, HStack, VStack } from '@/components/layout';

const alignments: NonNullable<ComponentProps<typeof VStack>['alignment']>[] = [
  'topLeading',
  'top',
  'topTrailing',
  'leading',
  'center',
  'trailing',
  'bottomLeading',
  'bottom',
  'bottomTrailing',
];

const Dot = () => (
  <div className={clsx('size-[15px] rounded-full bg-red-500')}></div>
);

export default function StackAlignmentPreview({
  stackType,
}: {
  stackType: 'vstack' | 'hstack';
}): ReactNode {
  return (
    <div
      className={clsx('grid size-[450px] grid-cols-3 grid-rows-3 gap-[10px]')}
    >
      <For each={alignments}>
        {alignment => {
          // TODO Change this to HStack (when implemented)
          const StackContainer = stackType === 'vstack' ? VStack : HStack;

          return (
            <div
              className={clsx('grid gap-[5px]')}
              style={{
                gridTemplateRows: 'max-content 1fr',
              }}
            >
              <p className={clsx('font-mono text-[12px]')}>{alignment}</p>

              <StackContainer
                className={clsx(
                  'size-full rounded-[10px] bg-gray-500 p-[10px]',
                )}
                alignment={alignment}
                spacing='5px'
              >
                <Dot />
                <Dot />
              </StackContainer>
            </div>
          );
        }}
      </For>
    </div>
  );
}
