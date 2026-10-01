import type { Preview } from '@storybook/nextjs-vite';

// @ts-expect-error Wrong config
import '../src/app/globals.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
