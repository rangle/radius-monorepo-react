/* eslint-disable @typescript-eslint/no-explicit-any */
// Helper script to log all  differences between two `tokens.json` outputs from TokenStudio
//
// To Run (from monorepo root):
// yarn ts-node -P ./config/typescript/tsconfig.json -O '{"module": "commonjs"}' ./library/foundations/scripts/lib/token-diff-helper.ts --base=../../tokens.json --target=../../my-new-tokens.json

const exampleSyntax = `yarn ts-node -P ./config/typescript/tsconfig.json -O '{"module": "commonjs"}' ./library/foundations/scripts/lib/token-diff-helper.ts --base=../../tokens.json --target=../../my-new-tokens.json`;

type Config = {
  /** Path to the base (e.g. `main`) `token.json` */
  base?: string;
  /** Path to the target (e.g. feature branch) `token.json` */
  target?: string;
};

const config = process.argv
  .slice(2)
  .flatMap((a) => a.split('=')) // split --base=some-path syntax
  .reduce<Config>((acc, curr, i, all) => {
    if (curr.startsWith('--')) {
      return acc;
    }
    if (all[i - 1] === '--base') {
      acc.base = curr;
    } else if (all[i - 1] === '--target') {
      acc.target = curr;
    }
    return acc;
  }, {});

if (!config.base) {
  console.error(
    `Error: "--base" argument not provided\n\nExample use:\n${exampleSyntax}`
  );
  console.warn('Error');
  process.exit(1);
}

if (!config.target) {
  console.error(
    `Error: "--target" argument not provided\n\nExample use:\n${exampleSyntax}`
  );
  console.warn('Error');
  process.exit(1);
}

const dataBase = import(config.base);
const dataTarget = import(config.target);

type DataLeaf = {
  type: string;
  value: string | Record<string, unknown>;
};

type DataNode = {
  [key: string]: DataNode | DataLeaf;
};

type TokenStudioData = {
  [tokenSet: string]: DataNode;
};

/** Token sets grouped by group */
type GroupedTokenSets = string[][];

const isLeafOrString = (
  s: DataLeaf | DataNode | string
): s is DataLeaf | string => {
  if (typeof s === 'string') {
    return true;
  }
  return 'type' in s && 'value' in s;
};

type TokenSetGroup = {
  name: string;
  value: string[];
};

const getTokenSetNamesGroups = (
  tokenStudioData: TokenStudioData
): GroupedTokenSets => {
  /** Values that are not tokenSets */
  const filtered = ['$themes', '$metadata', 'default'];
  const tokenSetNames = Object.keys(tokenStudioData).filter(
    (setName) => !filtered.includes(setName)
  );
  return tokenSetNames.reduce<GroupedTokenSets>((acc, tokenSet) => {
    const [groupName, variantName] = tokenSet.split('/');
    if (!variantName) {
      return [...acc, [tokenSet]];
    }
    const siblings = acc.find((group) =>
      group.find((t) => t.startsWith(groupName))
    );
    if (!siblings) {
      return [...acc, [tokenSet]];
    }
    return [
      ...acc.filter((group) => group.find((t) => !t.startsWith(groupName))),
      [...siblings, tokenSet],
    ];
  }, []);
};

/** reduces TokenSetNames to only the shared set in group format */
const getSharedTokenSetByGroup = (
  base: GroupedTokenSets,
  target: GroupedTokenSets
): TokenSetGroup[] => {
  const groupsBase = base.map((g) => g[0].split('/')[0]);
  const groupsTarget = target.map((g) => g[0].split('/')[0]);
  const sharedGroups = groupsBase.filter((g) => groupsTarget.includes(g));

  return sharedGroups.map((groupName) => {
    const baseContexts = base.filter((g) => g[0].startsWith(groupName)).flat();
    const targetContexts = target
      .filter((c) => c[0].startsWith(groupName))
      .flat();
    return {
      name: groupName,
      value: baseContexts.filter((c) => targetContexts.includes(c)),
    };
  });
};

/** Validates the groups (first part/full name of context name) */
const validateGroups = (
  base: GroupedTokenSets,
  target: GroupedTokenSets
): boolean => {
  const groupsBase = base.map((g) => g[0].split('/')[0]);
  const groupsTarget = target.map((g) => g[0].split('/')[0]);
  const baseOnlyGroups = groupsBase.filter((g) => !groupsTarget.includes(g));
  let hasError = false;
  if (baseOnlyGroups.length > 0) {
    console.warn(
      'Warning: Found Group(s) that only exist in base:\n',
      baseOnlyGroups.join('\n'),
      '\nwith these contexts:\n',
      base
        .find((g) => baseOnlyGroups.find((g1) => g[0].startsWith(g1)))
        ?.join('\n'),
      '\n'
    );
    hasError = true;
  }
  const targetOnlyGroups = groupsTarget.filter((g) => !groupsBase.includes(g));
  if (targetOnlyGroups.length > 0) {
    console.warn(
      'Warning: Found Group(s) that only exist in target:\n',
      targetOnlyGroups.join('\n'),
      '\nwith these contexts:\n',
      target
        .find((g) => targetOnlyGroups.find((g1) => g[0].startsWith(g1)))
        ?.join('\n'),
      '\n'
    );
    hasError = true;
  }
  return hasError;
};

/** Validate the Contexts (TokenSets) for divergence between base and target */
const validateContexts = (
  base: GroupedTokenSets,
  target: GroupedTokenSets
): boolean => {
  let hasError = false;
  const shared = getSharedTokenSetByGroup(base, target);
  shared.forEach((group) => {
    const baseContexts = base.filter((g) => g[0].startsWith(group.name)).flat();
    const targetContexts = target
      .filter((c) => c[0].startsWith(group.name))
      .flat();
    const baseOnlyContexts = baseContexts.filter(
      (c) => !group.value.includes(c)
    );
    const targetOnlyContexts = targetContexts.filter(
      (c) => !group.value.includes(c)
    );

    if (baseOnlyContexts.length > 0) {
      console.warn(
        'Warning: Found Contexts(s) that only exist in base:\n',
        baseOnlyContexts.join('\n'),
        '\n'
      );
      hasError = true;
    }

    if (targetOnlyContexts.length > 0) {
      console.warn(
        'Warning: Found Contexts(s) that only exist in target:\n',
        targetOnlyContexts.join('\n'),
        '\n'
      );
      hasError = true;
    }
  });

  return hasError;
};

/** Compare the top Groups and Contexts as they have special semantics that
 * don't work with the recursive check
 */
const compareGroupsAndContexts = (
  base: GroupedTokenSets,
  target: GroupedTokenSets
): boolean => {
  let hasError = validateGroups(base, target);
  if (!validateContexts(base, target)) {
    hasError = true;
  }
  return hasError;
};

const compareRecursive = (
  base: DataNode,
  target: DataNode,
  depth: number,
  parent: string
) => {
  const baseKeys = Object.keys(base);
  const targetKeys = Object.keys(target);
  let hasError = false;

  const baseOnlyKeys = baseKeys.filter((k) => !targetKeys.includes(k));
  const targetOnlyKeys = targetKeys.filter((k) => !baseKeys.includes(k));
  if (baseOnlyKeys.length > 0) {
    console.warn(
      `Warning: Found key(s) in ${parent} that only exist on base:\n`,
      baseOnlyKeys.map((k) => `${parent}.${k}`).join('\n'),
      '\n'
    );
    hasError = true;
  }
  if (targetOnlyKeys.length > 0) {
    console.warn(
      `Warning: Found key(s) in ${parent} that only exist on target:\n`,
      targetOnlyKeys.map((k) => `${parent}.${k}`).join('\n'),
      '\n'
    );
    hasError = true;
  }

  const sharedKeys = baseKeys.filter((k) => !targetOnlyKeys.includes(k));

  sharedKeys.forEach((k) => {
    const a = base[k];
    const b = target[k];
    if (a && b && !isLeafOrString(a) && !isLeafOrString(b)) {
      if (compareRecursive(a, b, depth + 1, `${parent}.${k}`)) {
        hasError = true;
      }
    }
  });
  return hasError;
};

Promise.all([dataTarget, dataBase]).then(
  ([tokenStudioDataTarget, tokenStudioDataBase]: [
    TokenStudioData,
    TokenStudioData
  ]) => {
    const tokenSetNamesGroupsTarget = getTokenSetNamesGroups(
      tokenStudioDataTarget
    );
    const tokenSetNamesGroupsBase = getTokenSetNamesGroups(tokenStudioDataBase);

    console.warn('Validating groups and contexts...');
    let hasError = compareGroupsAndContexts(
      tokenSetNamesGroupsBase,
      tokenSetNamesGroupsTarget
    );

    const sharedGroups = getSharedTokenSetByGroup(
      tokenSetNamesGroupsBase,
      tokenSetNamesGroupsTarget
    );

    console.warn('Validating tokens...');
    sharedGroups
      .filter((g) => g.value.length !== 0)
      .forEach((group) => {
        group.value.forEach((tokenSet) => {
          if (
            compareRecursive(
              tokenStudioDataBase[tokenSet] as any,
              tokenStudioDataTarget[tokenSet] as any,
              0,
              tokenSet
            )
          ) {
            hasError = true;
          }
        });
      });
    if (hasError) {
      console.warn('Error: Found some divergence - see logs above');
    } else {
      console.warn('Success: No divergence found.');
    }
  }
);
