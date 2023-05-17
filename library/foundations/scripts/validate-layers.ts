import { promises } from 'fs';
import {
  readStdin,
  parseData,
  validateData,
  processLayers,
  compareTokenLayers,
  TokenLayers,
  PARAM_SCREEN_MIN_WIDTH,
  PARAM_SECTION_NAME,
  PARAM_SCREEN_MAX_WIDTH,
} from './lib/token-parser';
import { isReference } from './lib/token-parser';

// For debugging purposes, you can run this script with:
// import * as data from '../tokens.json';
// const snapshotFileName = `${__dirname}/../generated/token-layers.json`;

const [, , snapshotFileName] = process.argv;

if (!snapshotFileName) {
  console.error(
    `Usage:  cat tokens.json | ts-node ${__filename} <previously-generated-layers>.json`
  );
  process.exit(1);
}

export const loadPreviousLayersFile = (fileName: string) => {
  console.warn('LAYERS PROCESSED. VALIDATING', fileName);
  return promises
    .readFile(fileName)
    .then(parseData)
    .catch((e) => {
      console.error(e.message);
      return null;
    });
};

/*
    # MAIN EXECUTION
    - reads data from standard input
    - parses the data into a JSON
    - validates it has the proper object structure
    - process each layer, extracting its tokens and parameters
    - reads the snapshot file of the previous version
    - validates if the file is compatible
      - exits with error if they are not 
  */

// Promise.resolve(data)
//  .then((data) => Buffer.from(JSON.stringify(data)))
readStdin()
  .then(parseData)
  .then(validateData)
  .then((data) =>
    Promise.all([processLayers(data), loadPreviousLayersFile(snapshotFileName)])
  )
  .then(([layerList, previousLayerList]) => {
    const errors = validateLayerList(layerList);
    if (errors.length) {
      console.warn('## NEW TOKENS HAVE ERRORS');

      errors.forEach(({ layer, message, missingVariables }) =>
        console.log(
          `::error file=library/foundations/tokens.json,title=${`Error in Layer ${layer}`}::${message}.`,
          missingVariables
            ? `missing tokens: ${missingVariables.join(', ')}`
            : ''
        )
      );
      process.exit(1);
    } else console.warn('# NEW TOKENS ARE VALID!');
    if (!previousLayerList) {
      console.warn('## TOKENS VERSION UPGRADED!');
      return;
    }
    // TODO: make showValueDifferences parameter configurable via command line
    const diff = compareTokenLayers(previousLayerList, layerList, false);
    console.warn(snapshotFileName, diff);
    if (diff.length) {
      console.warn('## NEW TOKENS HAVE BREAKING CHANGES');

      diff.forEach((m) =>
        console.log(
          `::error file=library/foundations/tokens.json,title=Breaking Changes in Tokens::${m}`
        )
      );
      process.exit(1);
    } else console.warn('## NEW TOKENS ARE COMPATIBLE!');
    process.exit(0);
  })
  .catch((e: Error) => {
    console.error(e.message);
    process.exit(1);
  });

type LayerError = {
  layer: string;
  message: string;
  missingVariables?: string[];
};

/**
 * Validates the layer list
 * error states
 *  - layer name is not unique
 *  - layer name is not a valid identifier
 *  - mutually exclusive layers don't have the same tokens
 *  - orphaned or unresolved references
 * @param layerList list of layers to validate
 * @returns list of errors
 */
const validateLayerList = (layerList: TokenLayers): LayerError[] => {
  const layerNames = layerList.layers.map((l) => l.name);
  // filters names that are not unique
  const nonUniqueNameErrors = layerNames
    .filter((name, index) => layerNames.indexOf(name) !== index)
    .map(
      (name): LayerError => ({
        layer: name,
        message: `Non-unique layer name`,
      })
    );

  // filters names that are not valid identifiers
  const invalidNameErrors = layerNames
    .filter((name) => !/^[a-zA-Z_$][a-zA-Z_\-0-9]*$/.test(name))
    .map(
      (name): LayerError => ({
        layer: name,
        message: `Invalid layer name`,
      })
    );

  // filters mutually exclusive layers that don't have the same tokens
  const dynamicLayers = layerList.layers.filter((l) => !l.isStatic);
  const screenSizeLayerErrors = validateLayerVariables(
    dynamicLayers,
    [PARAM_SCREEN_MIN_WIDTH, PARAM_SCREEN_MAX_WIDTH],
    'Contexts that are selected by viewport size should have the same tokens'
  );
  const sectionLayerErrors = validateLayerVariables(
    dynamicLayers,
    [PARAM_SECTION_NAME],
    'Contexts that are mutually exclusive should have the same tokens'
  );

  // filters layers that have unresolved references
  const unresolvedReferences = layerList.layers.flatMap(
    ({ name: layer, variables }) =>
      variables
        .filter(({ value }) => isReference(value))
        .map(({ name, value }) => ({
          layer,
          message: `Unresolved reference to ${value} in token ${name}`,
        }))
  );

  return [
    ...nonUniqueNameErrors,
    ...invalidNameErrors,
    ...screenSizeLayerErrors,
    ...sectionLayerErrors,
    ...unresolvedReferences,
  ];
};

/**
 * Validates that the layers have the same variables
 */
const validateLayerVariables = (
  allLayers: TokenLayers['layers'],
  parameters: string[],
  message: string
): LayerError[] => {
  const layers = allLayers.filter((l) => {
    const layerParameters = Object.keys(l.parameters);
    return parameters.every((p) => layerParameters.includes(p));
  });
  const layerNames = layers.map((l) => l.name);
  const allVariablePairs = layers.flatMap(({ name, variables }) =>
    variables
      // filter out the parameters
      .filter(({ name }) => !parameters.includes(name))
      .map((v) => [v.name, name])
  );
  const keyLayers = allVariablePairs.reduce((res, i) => {
    const [v, l] = i;
    if (res[v]) return { ...res, [v]: [...res[v], l] };
    return { ...res, [v]: [l] };
  }, {} as Record<string, string[]>);

  const layersWithMissingVariables = new Map<string, string[]>();

  Object.keys(keyLayers).forEach((v) => {
    const ls = keyLayers[v];
    if (ls.length === layerNames.length) return;
    const missingInLayers = layerNames.filter((l) => !ls.includes(l));
    console.warn(
      `Variable ${v} is missing in layers ${missingInLayers.join(', ')}`
    );
    missingInLayers.forEach((l) => {
      if (layersWithMissingVariables.has(l)) {
        const currentLayers = layersWithMissingVariables.get(l) ?? [];
        layersWithMissingVariables.set(l, [...currentLayers, v]);
      } else {
        layersWithMissingVariables.set(l, [v]);
      }
    });
  });

  return Array.from(layersWithMissingVariables.entries()).map(([l, vs]) => ({
    layer: l,
    message,
    missingVariables: vs,
  }));
};
