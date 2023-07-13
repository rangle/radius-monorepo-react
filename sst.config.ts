import { SSTConfig } from 'sst';
import { API } from './stacks/my-stack';

export default {
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
