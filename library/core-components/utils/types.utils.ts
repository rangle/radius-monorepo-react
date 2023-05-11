/**
 * A utility type that behaves like Pick, but with the option to specify items
 * that are required by passing them in the third generic argument.
 *
 * @example
 * // In this example, the `PickWithRequired` behaves exactly the same as `Pick`
 * type SameAsPick = PickWithRequired<SomeProps, 'direction' | 'space' | 'alignment'>
 *
 * // In this example, `direction` and `space` are handled normally, but `alignment` is required.
 * type WithRequiredProps = PickWithRequired<SomeProps, 'direction' | 'space', 'alignment'>
 */
export type PickWithRequired<
  T,
  K extends keyof T,
  R extends keyof T = never
> = Required<Pick<T, R>> & Pick<T, Exclude<K, R>>;
