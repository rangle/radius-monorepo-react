/**
 * A utility type that behaves like Pick, but makes the specified keys required.
 * */
export type RequireAndPick<T, K extends keyof T> = Required<Pick<T, K>>;
