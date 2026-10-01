/**
 * Strictly select keys from object.
 *
 * @example
 * type Frame = {
 *   width: number;
 *   height: number;
 *   resolution(): number;
 * };
 *
 * type Dimensions = SelectKeys<Frame, 'width' | 'height'>;
 * //    ^? 'width' | 'height'
 */
export type SelectKeys<T, Keys extends keyof T> = Keys;
