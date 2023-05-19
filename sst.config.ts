import { SSTConfig } from 'sst';
import { API } from './stacks/my-stack';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config(_input) {
    return {
      name: 'radius-remix',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
