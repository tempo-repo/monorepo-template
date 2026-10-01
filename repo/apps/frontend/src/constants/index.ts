import type { OpenGraph } from '@/types';

import ogSquareImg from '@root/public/open-graph/og (200x200).png';
import ogWideImg from '@root/public/open-graph/og (1200x627).png';

/**
 * This namespace contains all project-wide constants.
 */
export namespace Constants {
  export const APP_NAME = 'Next Template';
  export const APP_DEFAULT_TITLE = 'My Awesome App';
  export const APP_TITLE_TEMPLATE = `%s - ${Constants.APP_NAME}`;
  export const APP_DESCRIPTION = 'Generated from next-template';

  export const APP_THEME_KEY = ((): string => {
    return Constants.APP_NAME.toLowerCase().replace(/\W/, '-').concat('-theme');
  })();

  export const SHARED_OG_CONFIG = {
    images: [
      {
        url: ogSquareImg.src,
        width: 200,
        height: 200,
      } as OpenGraph.Image,
      {
        url: ogWideImg.src,
        width: 1200,
        height: 627,
      } as OpenGraph.Image,
    ],
    siteName: APP_NAME,
  } satisfies OpenGraph.ModifiedConfig;
}
