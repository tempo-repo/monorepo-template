import type { Meta } from '@storybook/nextjs-vite';
import { Axe, StarsIcon } from 'lucide-react';

import { VStack } from '@/components/layout';
import { StoryBuilder } from '@/utils/storybook';

import { Button } from './Button';

const meta = {
  title: 'UI Kit / Button',
  component: Button,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'danger'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

const builder = new StoryBuilder().defineMeta(meta).defineSharedProps({
  children: 'Click me!',
  onClick: () => alert('You clicked.'),
  variant: 'primary',
});

export const Base = builder.buildStory({});

export const WithIcons = builder.buildStory({
  render: args => (
    <VStack
      spacing={'1.2rem'}
      alignment={'center'}
    >
      <Button
        leadingIcon={StarsIcon}
        {...args}
      >
        Click me!
      </Button>

      <Button
        trailingIcon={Axe}
        {...args}
      >
        Click me!
      </Button>

      <Button
        leadingIcon={StarsIcon}
        trailingIcon={Axe}
        {...args}
      >
        Click me!
      </Button>
    </VStack>
  ),
});

export const Preserving_space = builder.buildStory({
  render: args => (
    <VStack
      spacing={'1.2rem'}
      alignment={'topLeading'}
    >
      <Button
        leadingIcon={StarsIcon}
        {...args}
      >
        Click me!
      </Button>

      <Button
        leadingIcon={null}
        trailingIcon={Axe}
        {...args}
      >
        Click me!
      </Button>

      <Button
        leadingIcon={null}
        {...args}
      >
        Click me!
      </Button>
    </VStack>
  ),
});

export const Primary = builder.buildStory({
  args: {
    variant: 'primary',
  },
});

export const Danger = builder.buildStory({
  args: {
    variant: 'danger',
  },
});
