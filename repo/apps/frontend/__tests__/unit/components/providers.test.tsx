import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import MatchMediaMock from 'vitest-matchmedia-mock';
import { injectMocks } from 'xenopomp-essentials/vitest';

import GlobalProviders from '@/app/providers';

describe('Providers', () => {
  const matcher = new MatchMediaMock();
  injectMocks(() => {
    matcher.clear();
    return () => matcher.destroy();
  }, 'afterEach');

  test('GlobalProviders can be rendered', () => {
    expect(() => render(<GlobalProviders />)).not.toThrow();
  });
});
