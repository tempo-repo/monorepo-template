import type { Metadata } from 'next';
import type { Merge, RequiredDeep } from 'type-fest';

/**
 * This namespace contains all types associated to OpenGraph configuration.
 */
 
export namespace OpenGraph {
  // Matches configuration type from Next.js config.
  export type Config = NonNullable<Metadata['openGraph']>;
  type RequiredConfig = RequiredDeep<Config>;

  // Matches single OG-image object for seo config.
  export type Image = Exclude<RequiredConfig['images'], unknown[]>;

  // OpenGraph config adapted for project needs.
  export type ModifiedConfig = Merge<Config, { images: Array<Image> }>;
}
