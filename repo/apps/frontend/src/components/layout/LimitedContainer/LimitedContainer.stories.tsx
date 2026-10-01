import type { Meta } from '@storybook/nextjs-vite';

import { StoryBuilder } from '@/utils/storybook';

import { LimitedContainer } from './LimitedContainer';

const meta = {
  title: 'Containers/Limited container',
  component: LimitedContainer,
  tags: ['autodoc'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
    },
  },
} satisfies Meta<typeof LimitedContainer>;

export default meta;

const builder = new StoryBuilder().defineMeta(meta).defineSharedProps({
  className: 'bg-red-500',
  children: <p>Container</p>,
  align: 'center',
});

export const Base = builder.buildStory({});
