import { describe, expect, test } from 'vitest';

import SomeComponentWithProps from '@/app/layout';
import type SomeComponent from '@/app/page';
import { StoryBuilder } from '@/utils/storybook';

describe('StoryBuilder', () => {
  test('Empty metadata can be built', () => {
    const metadata = new StoryBuilder<typeof SomeComponent>().buildStory({});
    expect(metadata).toStrictEqual({ args: {} });
  });

  test('Define meta is type-safe only function', () => {
    const metadata = new StoryBuilder<typeof SomeComponent>()
      .defineMeta({ title: 'Example/Test' })
      .buildStory({});

    expect(metadata).toStrictEqual({ args: {} });
  });

  test('Shared props are applied properly', () => {
    const metadata = new StoryBuilder()
      .defineMeta({
        component: SomeComponentWithProps,
      })
      .defineSharedProps({
        children: 'TEST',
      })
      .buildStory({});

    expect(metadata).toStrictEqual({ args: { children: 'TEST' } });
  });
});
