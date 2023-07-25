// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageConfig = require('../package.json');

export const version = packageConfig.version;
export * from './generated/design-tokens.constants'
export * from './generated/default-theme-settings.constants'
export * from './generated/design-tokens.types'
export * as icons from './generated/icons';
export * from './generated/icons/index';
