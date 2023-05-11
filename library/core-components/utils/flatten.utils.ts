type Primitive = string | number | boolean | symbol | null | undefined;

type NestedObject<T extends Primitive> = {
  [key: string]: T | NestedObject<T>;
};

/** type guard to assert that variable is an object */
const isObject = (obj: unknown): obj is Record<string, unknown> =>
  typeof obj === 'object' && obj !== null;

/** Type guard to assert that variable is NestedObject */
const isNestedObject = <T extends Primitive>(
  obj: unknown
): obj is NestedObject<T> => isObject(obj);

/** Flattens an object into an array of values. */
export const flattenObject = <T extends Primitive>(obj: NestedObject<T>) => {
  const result: T[] = [];

  function traverse(o: NestedObject<T>) {
    for (const key in o) {
      const value = o[key];
      if (isNestedObject<T>(value)) {
        traverse(value);
      } else {
        result.push(value);
      }
    }
  }

  traverse(obj);
  return result;
};
