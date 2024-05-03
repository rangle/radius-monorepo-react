import { StackContext, NextjsSite } from 'sst/constructs';

export function API({ stack }: StackContext) {
  // Create the Nextjs site
  const site = new NextjsSite(stack, 'RadiusNext', {
    path: 'apps/next-demo/',
  });

  // Add the site's URL to stack output
  stack.addOutputs({
    SiteUrl: site.url || 'localhost',
  });
}
