import type { Meta } from '@storybook/nextjs-vite';

import { StoryBuilder } from '@/utils/storybook';

import { InputField } from './InputField';

const meta = {
  title: 'UI Kit / Fields / Input field',
  component: InputField,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InputField>;

export default meta;

const builder = new StoryBuilder().defineMeta(meta).defineSharedProps({
  defaultValue: 'Input',
});

export const Base = builder.buildStory({});
