import {
  readStdin,
  parseData,
  validateData,
  processLayers,
  writeToStdout,
} from './lib/token-parser';

/*
  # MAIN EXECUTION
  - reads data from standard input
  - parses the data into a JSON
  - validates it has the proper object structure
  - process each layer, extracting its tokens and parameters
  - writes the file to stdout so it can be saved to disk
    as a snapshot or piped into a CSS renderer
*/
readStdin()
  .then(parseData)
  .then(validateData)
  .then(processLayers)
  .then((layerList) => {
    console.warn('LAYERS PROCESSED. GENERATING OUTPUT');
    return Buffer.from(JSON.stringify(layerList, undefined, 2));
  })
  .then(writeToStdout)
  .catch((e: Error) => {
    console.error(e.message);
    process.exit(1);
  });
