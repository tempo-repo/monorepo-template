import type { Meta, StoryObj } from '@storybook/react';
import deepmerge from 'deepmerge';
import type { ComponentType } from 'react';

/**
 * Infers proper type for render function for
 * StoryBuilder instance.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InferRenderFnType<B extends StoryBuilder<any, any, any>> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  B extends StoryBuilder<any, any, infer Story> ? Story['render'] : never;

export class StoryBuilder<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  For extends ComponentType<any>,
  M extends Meta<For> | undefined = undefined,
  Story extends StoryObj<M> = StoryObj<M>,
> {
  protected meta: M | undefined = undefined;
  protected sharedProps: Partial<Story['args']> = {};

  defineMeta<DM extends Meta<For>>(meta: DM) {
    const newBuilder = new StoryBuilder<For, DM>();
    newBuilder.meta = meta;
    return newBuilder;
  }

  defineSharedProps(props: Partial<Story['args']>) {
    const newBuilder = new StoryBuilder<For, M>();
    newBuilder.sharedProps = props;
    return newBuilder;
  }

  buildStory(partial: Partial<Story>): Story {
    return deepmerge(
      {
        args: {
          ...this.sharedProps,
        },
      },
      partial,
    );
  }
}
