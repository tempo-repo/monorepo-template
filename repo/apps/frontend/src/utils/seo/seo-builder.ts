import type { Metadata } from 'next';
import type { OpenGraph as OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types';

import { Constants } from '@/constants';
import env from '@/env';
import type { OpenGraph } from '@/types';

/**
 * Generates proper SEO config for pages.
 *
 * Builder instances have to be created with dedicated async method, because
 * we need to parse headers in initializer.
 *
 * @example
 * export async function generateMetadata(): Promise<Metadata> {
 *   return (await SEOBuilder.create())
 *     .title('Welcome!')
 *     .description(undefined)
 *     .build();
 * }
 */
export class SEOBuilder {
  private _applicationName: string = Constants.APP_NAME;
  private readonly _canonical: string;
  private _title: NonNullable<Metadata['title']> = {
    default: Constants.APP_NAME,
    template: Constants.APP_TITLE_TEMPLATE,
  };
  private _description: string | undefined = Constants.APP_DESCRIPTION;
  private _appleWebApp: Metadata['appleWebApp'] = {
    capable: false,
    statusBarStyle: 'default',
    title: Constants.APP_DEFAULT_TITLE,
  };
  private _og: OpenGraph.Config | undefined = undefined;

  constructor() {
    this._canonical = env.NEXT_PUBLIC_CANONICAL_URL;
  }

  title(newTitle: SEOBuilderType['_title']): SEOBuilder {
    this._title = newTitle;
    return this;
  }

  description(newDesc: SEOBuilderType['_description']): SEOBuilder {
    this._description = newDesc;
    return this;
  }

  appleWebApp(newConf: SEOBuilderType['_appleWebApp']): SEOBuilder {
    this._appleWebApp = newConf;
    return this;
  }

  openGraph({
    overrideImages,
    title,
    description,
    images,
  }: OpenGraphOptions): SEOBuilder {
    const newConfig: OpenGraph.Config = {
      ...Constants.SHARED_OG_CONFIG,

      images: [
        ...(overrideImages ? [] : Constants.SHARED_OG_CONFIG.images),
        ...(images || []),
      ] as NonNullable<OpenGraphType['images']>,

      type: 'website',
      siteName: Constants.APP_NAME,
      title: title || {
        default: Constants.APP_DEFAULT_TITLE,
        template: Constants.APP_TITLE_TEMPLATE,
      },
      description: description || Constants.APP_DESCRIPTION,
    };
    this._og = newConfig;
    return this;
  }

  build(): Metadata {
    return {
      applicationName: this._applicationName,
      title: this._title,
      metadataBase: new URL(this._canonical),
      description: this._description,
      appleWebApp: this._appleWebApp,
      formatDetection: {
        telephone: false,
      },
      openGraph: this._og,
      twitter: {
        card: 'summary',
        title: this._title,
        description: this._description,
      },
    };
  }
}

type SEOBuilderType = InstanceType<typeof SEOBuilder>;

type OpenGraphOptions = Pick<OpenGraph.Config, 'title' | 'description'> & {
  /** If true, default OG images will be dropped. */
  overrideImages: boolean;

  /**
   * Select which images to display as OG.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images?: Extract<OpenGraph.Config, Array<any>>;
};
