import { cleanup, render, screen } from '@testing-library/react';
import type { ComponentProps, ElementType } from 'react';
import { afterEach, describe, expect, test } from 'vitest';

import { Button, Field } from '@ui/kit';

import { HStack, VStack, ZStack } from '@/components/layout';

testMorphableComponent(VStack, 'VStack', 'div', {});
testMorphableComponent(HStack, 'HStack', 'div', {});
testMorphableComponent(ZStack, 'ZStack', 'div', {});
testMorphableComponent(Field, 'Field', 'div', {});
testMorphableComponent(Button, 'Button', 'button', {});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function testMorphableComponent<C extends ElementType<{ as?: any }>>(
  Comp: C,
  name: string,
  defaultTag: Extract<ElementType, string>,
  { ...props }: Omit<ComponentProps<C>, 'as'>,
) {
  describe(`Morphing ${name}`, () => {
    afterEach(() => {
      cleanup();
    });

    test('It renders', () => {
      expect(() =>
        render(
          // @ts-expect-error TL to fix types
          <Comp
            as={'div'}
            {...props}
          />,
        ),
      ).not.toThrow();
    });

    test(`Default tag is <${defaultTag}/>`, () => {
      render(
        // @ts-expect-error TL to fix types
        <Comp
          data-testid='morphing'
          {...props}
        />,
      );
      const elem = screen.getByTestId('morphing');
      expect(elem.tagName).toEqual(defaultTag.toUpperCase());
    });

    test('It can change forms', () => {
      render(
        // @ts-expect-error TL to fix types
        <Comp
          as={'section'}
          data-testid='morphing'
          {...props}
        />,
      );
      const elem = screen.getByTestId('morphing');
      expect(elem.tagName).toEqual('section'.toUpperCase());
    });
  });

  // const elem = screen.getByTestId('morphing');
}
