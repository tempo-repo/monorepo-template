import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';

import { ExampleView } from '@/components/ui';

describe('ExampleView', () => {
  afterEach(() => {
    cleanup();
  });

  test('It renders', () => {
    expect(() => render(<ExampleView />)).not.toThrow();
  });

  test('Buttons are working', () => {
    // Render view
    render(<ExampleView />);

    // Extract buttons by their IDs
    const lightThemeButton =
      screen.getByTestId<HTMLButtonElement>('set-light-theme');
    const darkThemeButton =
      screen.getByTestId<HTMLButtonElement>('set-dark-theme');

    expect(() => fireEvent.click(lightThemeButton)).not.toThrow();
    expect(() => fireEvent.click(darkThemeButton)).not.toThrow();
  });
});
