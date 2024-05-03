import { SSTConfig } from 'sst';
import { API } from './stacks/next-demo-stack';

export default {
  config(_input) {
    return {
      name: 'radius-next',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
