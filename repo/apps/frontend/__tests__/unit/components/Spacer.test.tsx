import { cleanup, render, screen } from '@testing-library/react';
import { afterAll, describe, expect, test } from 'vitest';

import { Spacer } from '@/components/layout';

describe('Spacer component', () => {
  afterAll(() => {
    cleanup();
  });

  test('It renders', () => {
    render(<Spacer data-testid='spacer' />);
    expect(screen.queryByTestId('spacer')).not.toBeNull();
  });

  test('It grows in flex space', () => {
    expect(screen.getByTestId('spacer').className).toContain('flex-grow');
  });
});
