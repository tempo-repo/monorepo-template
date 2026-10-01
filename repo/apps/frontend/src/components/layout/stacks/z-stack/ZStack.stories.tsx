import type { Meta } from '@storybook/nextjs-vite';
import clsx from 'clsx';

import { StoryBuilder } from '@/utils/storybook';

import { ZStack } from './ZStack';

const meta = {
  title: 'Layout / Stacks / ZStack',
  component: ZStack,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ZStack>;

export default meta;

const builder = new StoryBuilder<typeof ZStack>()
  .defineMeta(meta)
  .defineSharedProps({
    children: (
      <>
        <div
          className={clsx(
            'aspect-square w-[150px] bg-red-500/25',
            'flex items-center justify-center',
          )}
        >
          12
        </div>
      </>
    ),
  });

export const Base = builder.buildStory({});
