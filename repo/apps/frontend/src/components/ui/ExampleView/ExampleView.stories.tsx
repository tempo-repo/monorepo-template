import type { Meta } from '@storybook/nextjs-vite';

import { StoryBuilder } from '@/utils/storybook';

import { ExampleView } from './ExampleView';

const meta = {
  title: 'Example/View',
  component: ExampleView,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ExampleView>;

export default meta;

const builder = new StoryBuilder<typeof ExampleView>()
  .defineMeta(meta)
  .defineSharedProps({});

export const Base = builder.buildStory({});
