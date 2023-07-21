# Radius Booster Design System Kit

Welcome to the Radius Booster Design System Kit! Radius Booster is a model design system created to help you build
consistent, scalable, and maintainable user interfaces using Design Contexts as Code.

## Getting Started

Follow the steps below to set up the Radius Booster Design System Kit on your local machine:

### 1. Clone the repository

Start by cloning the repository to your local machine using the following command:

``` bash
git clone https://github.com/rangle/radius-monorepo-react
```

### 2. Install dependencies

Navigate to the cloned repository's root directory and install the required dependencies by running:

``` bash
yarn install
```

This command installs all the necessary packages and dependencies required for the project.

### 3. Set up NX Cloud

Before you can start working with NX Cloud, you need to create an nx-cloud.env file in the root directory. This file
should contain the NX Cloud authentication token key. Here's how to set it up:

``` bash
echo "NX_CLOUD_AUTH_TOKEN=<your-nx-cloud-token>" > nx-cloud.env
```

Replace <your-nx-cloud-token> with your actual NX Cloud token. This sets up NX Cloud for the project.

### 4. Run Storybook

To view and test the components, run the Storybook development server with the following command:

``` bash
yarn storybook
```

This command launches the Storybook server, which provides an interactive, visual environment to explore and test the
components in isolation. You can access Storybook by opening a web browser and navigating to http://localhost:6006.

### 5. Run the demo app

To see the components in action, you can run the demo app by executing the following command:

``` bash
yarn demo
```

This command starts the demo app, which showcases the various components and their usage within a real-world application
context. You can access the demo app by opening a web browser and navigating to http://localhost:3000.

## License

The Radius Booster Design System Kit is licensed under the MIT License. Please see the LICENSE file for more
information.

## Support

If you encounter any issues or have questions, please create an issue on GitHub, and we'll do our best to help you out.
We appreciate your feedback and are committed to improving the Radius Booster Design System Kit to better serve the
development community.