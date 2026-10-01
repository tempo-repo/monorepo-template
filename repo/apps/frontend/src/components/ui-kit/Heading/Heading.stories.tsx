import type { Meta } from '@storybook/nextjs-vite';

import { VStack } from '@/components/layout';
import { StoryBuilder } from '@/utils/storybook';

import { Heading } from './Heading';
import { headingSizesMap } from './Heading.props';

const meta = {
  title: 'UI Kit / Heading',
  component: Heading,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Heading>;

export default meta;

const builder = new StoryBuilder().defineMeta(meta).defineSharedProps({});

export const All_headings = builder.buildStory({
  render: () => (
    <VStack
      alignment={'topLeading'}
      spacing={'0.5rem'}
    >
      {Object.keys(headingSizesMap)
        .map(k => +k as 1 | 2 | 3 | 4 | 5)
        .map(key => (
          <Heading
            level={key}
            key={`heading-level-${key}`}
          >
            Heading {key}
          </Heading>
        ))}
    </VStack>
  ),
});
