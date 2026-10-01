import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { z } from 'zod';

import { For } from '@/components/layout';

describe('For component', () => {
  afterEach(() => {
    cleanup();
  });

  test('Empty array', () => {
    render(<TestFor.Component values={[]} />);
    expect(TestFor.getData().length).toEqual(0);
  });

  test('One entry', () => {
    render(<TestFor.Component values={['first']} />);
    expect(TestFor.getData()).toStrictEqual([
      { value: 'first', idx: 0, isFirst: true, isLast: true },
    ] as TestFor.Data);
  });

  test('Multiple entries', () => {
    render(<TestFor.Component values={['first', 'dum', 'bar']} />);
    expect(TestFor.getData()).toStrictEqual([
      { value: 'first', idx: 0, isFirst: true, isLast: false },
      { value: 'dum', idx: 1, isFirst: false, isLast: false },
      { value: 'bar', idx: 2, isFirst: false, isLast: true },
    ] as TestFor.Data);
  });
});

namespace TestFor {
  export function Component({ values }: { values: string[] }) {
    return (
      <For each={values}>
        {(value, idx, { isFirst, isLatest }) => (
          <p
            data-testid={'value-tag'}
            key={`value-tag-${idx}`}
            data-value={value}
            data-idx={idx}
            data-is-first={isFirst}
            data-is-latest={isLatest}
          ></p>
        )}
      </For>
    );
  }

  export type Data = {
    value: string | undefined;
    idx: number;
    isFirst: boolean;
    isLast: boolean;
  }[];

  export function getData(): Data {
    return screen.queryAllByTestId('value-tag', {}).map(elem => ({
      value: elem.getAttribute('data-value') ?? undefined,
      idx: z.coerce.number().parse(elem.getAttribute('data-idx')),
      isFirst: z.stringbool().parse(elem.getAttribute('data-is-first')),
      isLast: z.stringbool().parse(elem.getAttribute('data-is-latest')),
    }));
  }
}
