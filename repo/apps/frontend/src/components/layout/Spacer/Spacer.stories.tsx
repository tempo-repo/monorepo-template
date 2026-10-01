import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import clsx from 'clsx';

import { Spacer } from './Spacer';

const meta = {
  title: 'Layout/Spacer',
  component: Spacer,
  tags: ['autodoc'],
  parameters: {
    // layout: 'centered',
  },
} satisfies Meta<typeof Spacer>;

export default meta;

type Story = StoryObj<typeof meta>;

const decorators = (vertical?: boolean): Story['decorators'] => [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (child: any, args: any) => (
    <div
      className={clsx('flex', {
        'h-[50dvh] flex-col': !!vertical,
      })}
    >
      <div>Spacer</div>
      {child(args)}
      <div>Spacer</div>
    </div>
  ),
];

const sharedProps = {
  className: clsx('bg-red-500/50'),
} satisfies Partial<Story['args']>;

export const Horizontal: Story = {
  args: {
    ...sharedProps,
  },
  decorators: decorators(),
};

export const Vertical: Story = {
  args: {
    ...sharedProps,
  },
  decorators: decorators(true),
};
