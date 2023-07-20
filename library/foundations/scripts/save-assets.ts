import { promises } from 'fs';
import sharp from 'sharp';
import axios from 'axios';
import { parseData } from './lib/token-parser';
import { TokenLayer, TokenLayers } from './lib/token-parser.types';
import { isVariableReference } from './lib/token-parser.utils';
import { config } from '../generator-config';

const MEDIA_FILES_PATH = './generated';

const [, , snapshotFileName] = process.argv;

if (!snapshotFileName) {
  console.error(
    `Usage:  cat tokens.json | ts-node ${__filename} <previously-generated-layers>.json`
  );
  process.exit(1);
}

const assetSavePath = (path: string) => `${MEDIA_FILES_PATH}/${path}/assets`;

export const loadLayersFile = (fileName: string): Promise<TokenLayers> => {
  console.warn('LAYERS PROCESSED. VALIDATING', fileName);
  return promises
    .readFile(fileName)
    .then(parseData)
    .catch((e) => {
      console.error(e.message);
      return null;
    });
};

const findAssetSizeAndDimensions = async (url: string) => {
  console.info('fetching', url);
  return axios
    .get(url, { responseType: 'arraybuffer' })
    .catch((e) => {
      console.warn(`Error downloading ${url}`);
      throw e;
    })
    .then(async (response) => {
      console.info('downloaded. converting to webp');
      const image = sharp(Buffer.from(response.data));

      return Promise.all(
        [...config.imageSizes, 'full' as const].map((width) =>
          image
            .resize(
              width === 'full' // full res version
                ? undefined
                : {
                    // resize to max-size, this might sometimes create duplicates,
                    // if the source image is small, but this makes the
                    width: width,
                    height: width,
                    fit: 'inside',
                    withoutEnlargement: true,
                  }
            )
            .webp()
            .toBuffer({ resolveWithObject: true })
            .then((v) => ({
              ...v,
              width,
            }))
            .catch((e) => {
              console.warn(`Error parsing ${url}`);
              throw e;
            })
        )
      );
    });
};

const isNotUndefined = <T>(x: T | undefined): x is T => x !== undefined;

const filterUnique =
  <T extends { path: string }>(resolveName = (p: string) => p) =>
  (acc: string[], { path }: T): string[] => {
    const name = resolveName(path);
    if (!acc.includes(name)) {
      return [...acc, name];
    }
    return acc;
  };

// Promise to delay items in batches, e.g. to avoid upstream rate-limiting
const batchDelay = (requestIndex: number, batchSize = 20) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), Math.floor(requestIndex / batchSize) * 20);
  });

loadLayersFile(snapshotFileName)
  .then(({ layers, order }) => {
    return order
      .map((name) => layers.find((layer) => layer.name === name))
      .filter(isNotUndefined)
      .flatMap((layer: TokenLayer) =>
        layer.variables
          .filter(
            (token) =>
              token.type === 'asset' && !isVariableReference(token.value)
          )
          .map(({ name, value }) => ({
            name,
            value,
            path: layer.name.replace(/--/g, '/'),
          }))
      );
  })
  .then((assets) =>
    // for every asset, download it and convert it to webp
    Promise.all(
      assets.flatMap(({ value, ...rest }, i) =>
        batchDelay(i)
          .then(() => findAssetSizeAndDimensions(value))
          .then((variations) =>
            variations.map((variation) => ({
              ...rest,
              ...variation,
            }))
          )
      )
    ).then((v) => v.flat())
  )
  .then((downloadedAssets) => {
    // find all the directories we need to create
    const directoriesToCreate = downloadedAssets.reduce(
      filterUnique((path) => assetSavePath(path)),
      [] as string[]
    );
    console.log('DIRECTORIES TO CREATE:', directoriesToCreate);
    // create all directories we need to create and return the original asset list
    return Promise.all([
      createDirectories(directoriesToCreate),
      downloadedAssets,
    ] as const);
  })
  .then(([createdDirectories, downloadedAssets]) =>
    // save all the asset files with the correct name and extension
    Promise.all([createdDirectories, saveFiles(downloadedAssets)] as const)
  )
  .then(([createdDirectories]) => {
    createdDirectories.filter(Boolean).forEach((dir) => {
      console.info('CREATED DIR:', dir);
    });
    console.info('DONE');
  })
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
function createDirectories(
  directoriesToCreate: string[]
): Promise<(string | undefined)[]> {
  return Promise.all(
    directoriesToCreate.map((p) => promises.mkdir(p, { recursive: true }))
  );
}

const saveFiles = <
  T extends {
    data: Buffer;
    name: string;
    path: string;
    width?: number | string;
  }
>(
  downloadedAssets: T[]
): Promise<void[]> =>
  Promise.all(
    downloadedAssets.map(({ name, data, path, width }) => {
      const fileName = `${assetSavePath(path)}/${name}${
        width && width !== 'full' ? `_w${width}` : ''
      }.webp`;
      console.info(`SAVING ${fileName}`);
      return promises.writeFile(fileName, data);
    })
  );
