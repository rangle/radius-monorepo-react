# Deploying Remix Demo App to AWS using SST

The Radius demo app is a Remix app used to test and demonstrate the Radius design system components.

The demo app is deployed to AWS lambda function and S3 using the [SST](https://docs.sst.dev/) framework. We can deploy the demo app either from a local machine or from the GitHub action pipeline.

## Deploying from GitHub action pipeline

The GitHub action deployment pipeline is triggered by merging to the main branch. The `deployment.yml` file in the `.github/workflows` directory contains the pipeline definition. The GitHub action pipeline performs the following steps:

1. Lint and test monorepo packages that have changed using the Nx `affected` command
2. Build the demo app (this step also builds the core-component and foundations packages as a prerequisite)
3. Configure AWS credentials for the deployment using GitHub actions. The credentials are stored in  [GitHub secrets](https://github.com/rangle/radius-monorepo-react/settings/secrets/actions).
4. Deploy the demo app to AWS using the `sst deploy` command. The `--stage` flag is used to specify the environment.

## Deploying from local machine

The demo app can be deployed from your local machine using the `sst deploy` command. The `--stage` flag is used to specify the environment. Follow this [guide](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file) to configure the AWS credentials.

By default, SST uses the credentials for the default profile. To use one of the other profiles, set the AWS_PROFILE environment variable. For example:

```bash
$ AWS_PROFILE=radius npx sst deploy
```

## Environments

The demo app is deployed to two environments:

- `radius-pr`: https://d11mwnosflssyy.cloudfront.net/. The demo app is deployed for PR preview.
- `prod`: https://d7mzfbcjb41ud.cloudfront.net. The demo app is deployed when code is merged to the main branch. This is the environment used for the demo.
