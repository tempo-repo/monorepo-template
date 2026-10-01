import type { Metadata } from 'next';
import { describe, expect, test } from 'vitest';

import { Constants } from '@/constants';
import { SEOBuilder } from '@/utils/seo';

describe('SEOBuilder', () => {
  test('Default values', () => {
    const {
      applicationName,
      title,
      description,
      appleWebApp,
      openGraph,
    }: Metadata = new SEOBuilder().build();

    // Default values are assigned with constant values.
    expect({
      applicationName,
      title,
      description,
      appleWebApp,
      openGraph,
    }).toStrictEqual({
      applicationName: Constants.APP_NAME,
      title: {
        default: Constants.APP_NAME,
        template: Constants.APP_TITLE_TEMPLATE,
      },
      description: Constants.APP_DESCRIPTION,
      appleWebApp: {
        capable: false,
        statusBarStyle: 'default',
        title: Constants.APP_DEFAULT_TITLE,
      },
      openGraph: undefined,
    });
  });

  test('Title can be changed', () => {
    assertChainMethod('title', 'title', 'NEW TITLE');
  });

  test('Description can be changed', () => {
    assertChainMethod('description', 'description', 'Some cool site');
  });

  test('AppleWebApp config can be overwritten', () => {
    assertChainMethod('appleWebApp', 'appleWebApp', {
      statusBarStyle: 'black-translucent',
      capable: true,
    });
  });

  test('OpenGraph images can be overwritten', () => {
    const { openGraph } = new SEOBuilder()
      .openGraph({
        overrideImages: true,
      })
      .build();

    expect((openGraph?.images as unknown[]).length).toEqual(0);
  });

  test('OpenGraph default images', () => {
    const { openGraph } = new SEOBuilder()
      .openGraph({
        overrideImages: false,
      })
      .build();

    expect((openGraph?.images as unknown[]).length).toBeGreaterThan(0);
    expect(openGraph?.images as unknown[]).toStrictEqual(
      Constants.SHARED_OG_CONFIG.images,
    );
  });
});

type MethodType = keyof Omit<
  {
    [Key in keyof InstanceType<typeof SEOBuilder>]: boolean;
  },
  'build'
>;

function assertChainMethod<M extends MethodType>(
  method: M,
  extractedProperty: keyof Metadata,
  value: Parameters<SEOBuilder[M]>[0],
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = new SEOBuilder()[method](value as any).build();
  expect(meta[extractedProperty]).toStrictEqual(value);
}
