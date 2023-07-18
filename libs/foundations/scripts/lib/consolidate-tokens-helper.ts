/* eslint-disable @typescript-eslint/no-explicit-any */
// Helper script to assist with the merging of tokens.
// Currently it can't do everything and requires manual work for complicated issues.
//
// To Run (from monorepo root):
// yarn ts-node -P ./config/typescript/tsconfig.json -O '{"module": "commonjs"}' ./library/foundations/scripts/lib/consolidate-tokens-helper.ts

import { writeFileSync } from 'fs';
import path from 'path';

const data = import('../../tokens.json');
const outputFile = path.join(__dirname, '../../tokens-out.json');

type Structure = {
  [key: string]: Structure | string;
};

type Leaf = {
  type: string;
  value: string | Structure;
};

const isLeaf = (s: Structure): s is Leaf => {
  if (typeof s !== 'object') {
    return false;
  }
  return 'type' in s && 'value' in s;
};

const deepCompare = <T extends Structure, U extends Structure>(
  /** Base (source of truth) */
  a: T,
  /** target */
  b: U,
  // /** parent of target `b` */
  // parentB: Structure,
  parent: string,
  whenNotFound: (
    name: string,
    aValue: string | Structure,
    bValue: string | Structure
  ) => void,
  fix = false
) => {
  if (isLeaf(a) !== isLeaf(b) && b !== undefined) {
    console.log(
      '\n> miss-match replace b with a\na:',
      a,
      '\nb:\n',
      b,
      '\n\n\n'
    );
    Object.keys(b).forEach((k) => {
      delete b[k];
    });
    Object.keys(a).forEach((k) => ((b[k] as any) = a[k]));
    return;
  }
  Object.keys(a).forEach((key) => {
    const name = `${parent}.${key}`;
    const aValue = a[key];
    const bValue = b[key];
    if (typeof aValue === 'object' && typeof bValue === 'object') {
      deepCompare(aValue, bValue, name, whenNotFound, fix);
    } else if (typeof aValue !== typeof bValue) {
      whenNotFound(name, aValue, bValue);

      if (typeof b === 'object' && bValue === undefined) {
        // @ts-expect-error - this is fine
        b[key] = aValue;
      }
    }
  });
};

data.then((tokenStudioData) => {
  /** Base (source of truth) */
  const base = 'Brand/PhotoStop';
  /** Target to be updated to match `base` */
  const target = 'Brand/Saddles';
  console.log(`update '${base}' to match '${target}'...`);

  deepCompare(
    tokenStudioData[base],
    tokenStudioData[target],
    '',
    (...args) =>
      console.warn('Warning - these attributes do not match:\n', ...args),
    true
  );

  console.log(
    'Running comparison again step to see if all issues were auto-fixed...\n\n'
  );

  // validation step
  deepCompare(
    tokenStudioData['Brand/PhotoStop'],
    tokenStudioData['Brand/Saddles'],
    '',
    (...args) => console.warn(args, 'not equal')
  );

  console.log('Outputing result to:\n', outputFile);

  writeFileSync(
    path.join(__dirname, '../../tokens-out.json'),
    JSON.stringify(tokenStudioData, null, 2)
  );
});
