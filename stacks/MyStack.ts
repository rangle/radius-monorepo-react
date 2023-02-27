import { StackContext, RemixSite } from 'sst/constructs';

export function API({ stack }: StackContext) {
  // Create the Remix site
  const site = new RemixSite(stack, 'RadiusRemix', {
    path: 'apps/demo/',
  });

  // Add the site's URL to stack output
  stack.addOutputs({
    URL: site.url || 'localhost',
  });
}
