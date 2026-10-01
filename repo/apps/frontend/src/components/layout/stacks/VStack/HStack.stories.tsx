import type { Meta } from '@storybook/nextjs-vite';

import { StoryBuilder } from '@/utils/storybook';

import { HStack } from './HStack';
import Preview from './SB_Preview';

const meta = {
  title: 'Layout / Stacks / HStack',
  component: HStack,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HStack>;

export default meta;

const builder = new StoryBuilder<typeof HStack>()
  .defineMeta(meta)
  .defineSharedProps({});

export const Base = builder.buildStory({
  render: () => <Preview stackType='hstack' />,
});
