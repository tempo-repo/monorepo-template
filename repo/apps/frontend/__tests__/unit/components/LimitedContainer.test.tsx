import { cleanup, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { afterEach, describe, expect, test } from 'vitest';

import { LimitedContainer } from '@/components/layout';
import type { SelectKeys } from '@/types';

describe('LimitedContainer', () => {
  afterEach(() => {
    cleanup();
  });

  test('Max size is applied', () => {
    inspectStyle('maxSize', '500px', '750px');
    inspectStyle('insets', '2.5rem', '10rem');
  });
});

function inspectStyle<
  K extends SelectKeys<
    ComponentProps<typeof LimitedContainer>,
    'maxSize' | 'insets'
  >,
>(property: K, defaultValue: string, value: string) {
  const inspectionProfile = new Map<
    K,
    { propertyName: string; args: ComponentProps<typeof LimitedContainer> }
  >([
    [
      'maxSize' as K,
      {
        propertyName: '--max-size',
        args: {
          maxSize: value,
        },
      },
    ],
    [
      'insets' as K,
      {
        propertyName: '--insets',
        args: {
          insets: value,
        },
      },
    ],
  ]);
  const { propertyName, args } = inspectionProfile.get(property)!;

  // Render with default value
  render(<LimitedContainer data-testid={'ct'} />);
  const container = screen.getByTestId<HTMLElement>('ct');
  const styles = container.style;
  expect(styles.getPropertyValue(propertyName)).toBe(defaultValue);
  cleanup();

  // Render with changed value
  render(
    <LimitedContainer
      data-testid={'ct'}
      {...args}
    />,
  );
  const newContainer = screen.getByTestId<HTMLElement>('ct');
  const newStyles = newContainer.style;
  expect(newStyles.getPropertyValue(propertyName)).toBe(`${value}`);
  cleanup();
}
