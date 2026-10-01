import type { Meta } from '@storybook/nextjs-vite';
import clsx from 'clsx';

import { StoryBuilder } from '@/utils/storybook';

import { For } from './For';

const meta = {
  title: 'Layout / For (loop)',
  component: For,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof For>;

export default meta;

const builder = new StoryBuilder<typeof For>()
  .defineMeta(meta)
  .defineSharedProps({
    each: [1, 10, 15],
    children: (item: unknown, idx, { isFirst, isLatest }) => (
      <p
        className={clsx('border border-red-500 bg-slate-200 px-2 py-1', {
          '!bg-red-500/15': isFirst,
          '!bg-green-500/15': isLatest,
        })}
      >
        {item as number} (#{idx + 1})
      </p>
    ),
  });

export const Base = builder.buildStory({});
