import { promises } from 'fs';
import {
  readStdin,
  parseData,
  validateData,
  processLayers,
  compareTokenLayers,
} from './lib/token-parser';

const [, , snapshotFileName] = process.argv;

if (!snapshotFileName) {
  console.error(
    `Usage:  cat tokens.json | ts-node ${__filename} <previously-generated-layers>.json`
  );
  process.exit(1);
}

export const loadPreviousLayersFile = (fileName: string) => {
  console.warn('LAYERS PROCESSED. VALIDATING', fileName);
  return promises.readFile(fileName).then(parseData);
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

readStdin()
  .then(parseData)
  .then(validateData)
  .then((data) =>
    Promise.all([processLayers(data), loadPreviousLayersFile(snapshotFileName)])
  )
  .then(([layerList, previousLayerList]) => {
    const diff = compareTokenLayers(previousLayerList, layerList, true);
    if (diff.length) {
      console.warn('# NEW TOKENS HAVE BREAKING CHANGES');
      diff.forEach((m) => console.warn(m));
      process.exit(1);
    } else console.warn('# NEW TOKENS ARE COMPATIBLE!');
    process.exit(0);
  })
  .catch((e: Error) => {
    console.error(e.message);
    process.exit(1);
  });
