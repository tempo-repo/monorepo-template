import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';

import { Constants } from '@/constants';

import RQProvider from './RQProvider';

export default function GlobalProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute='class'
      storageKey={Constants.APP_THEME_KEY}
      enableSystem
    >
      <RQProvider>{children}</RQProvider>
    </ThemeProvider>
  );
}
