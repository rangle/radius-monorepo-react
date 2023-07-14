# Demo App Deployment

Date: 2023-03-07

## Status

Active

## Context

The idea is to easily validate design system changes in a sandbox environment that is visible for all team members. For example, a designer may want to update theme colors and test the impact of such changes in a real-world application. The workflow could be as follows:

- a designer updates theme colors in Figma and exports the raw design token file `token.json`
- a developer adds the exported design token file `token.json` in the `library/foundations` folder and creates a pull request
- the pull request triggers the GitHub action pipeline that transforms the raw design token file into the generated `theme.css` file, and builds the radius core components
- the pull request also triggers the GitHub action pipeline that deploys the demo app and updates the demo app url in the pull request
- the designer can now test the design system changes in the demo app

The deployment should support server side rendering since the demo app is a Remix app. We also want to find a solution that is cost-effective and easy to maintain as the team grows.

## Decision

We will use the [SST](https://docs.sst.dev/) framework to deploy the demo app to AWS lambda function and S3. The deployment is automated using the GitHub action pipeline triggered by a pull request. Multiple staging environments are supported using the `--stage` flag.

## Alternatives Considered

- deploy the demo app to Vercel: while the setup is straightforward, the Vercel deployment pricing is not suitable for our use case
- deploy the demo app to AWS using [Architect](https://arc.codes/docs/en/get-started/quickstart): although this is the solution backed by [Remix stacks](https://github.com/remix-run/grunge-stack), the set-up for deploying a Remix app is not well documented, and the learning curve is steep for the team.

## Consequences

SST is a good option for our use case because:

- It is easy to set up and maintain. The initial set-up requires minimal configuration as seen in this [guide to deploy remix site](https://docs.sst.dev/constructs/RemixSite).

- We can add other AWS resources as needed. For example, we can add a DynamoDB table to the demo app by using the `Table` construct, and grant the permission to access the table with simple configuration. See this [guide](https://docs.sst.dev/constructs/RemixSite#using-aws-services) for more details.

- Contributors to the project don't need access to the AWS credentials. The GitHub action pipeline is configured to use the GitHub secrets to access the AWS account.

- SST supports testing the Remix app APIs locally using the `sst dev` command. See this [guide](https://docs.sst.dev/console) for more details.
