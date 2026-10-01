import type { Meta } from '@storybook/nextjs-vite';

import { StoryBuilder } from '@/utils/storybook';

import { Field } from './Field';

const meta = {
  title: 'UI Kit / Fields / Core field',
  component: Field,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Field>;

export default meta;

const builder = new StoryBuilder().defineMeta(meta).defineSharedProps({
  children: 'This is an field',
});

export const Base = builder.buildStory({});
