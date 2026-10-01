import type { Meta } from '@storybook/nextjs-vite';

import { StoryBuilder } from '@/utils/storybook';

import Preview from './SB_Preview';
import { VStack } from './VStack';

const meta = {
  title: 'Layout / Stacks / VStack',
  component: VStack,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof VStack>;

export default meta;

const builder = new StoryBuilder<typeof VStack>()
  .defineMeta(meta)
  .defineSharedProps({});

export const Base = builder.buildStory({
  render: () => <Preview stackType='vstack' />,
});
