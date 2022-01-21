# MarocShip-Delivery

MarocShip wishes to facilitate delivery management with partner e-commerce sites by creating a Rest API

# Environment vars

This project uses the following environment variables:

| Name                       | Description                                      |
| -------------------------- | ------------------------------------------------ |
| SENTRY_DSN                 | [Sentry](https://docs.sentry.io/platforms/node/) |
| ADMIN_SECRET_KEY           | Random key for jwt                               |
| ADMIN_SECRET_KEY           | Random key for jwt                               |
| MANAGER_SECRET_KEY         | Random key for jwt                               |
| DELIVERYMANAGER_SECRET_KEY | Random key for jwt                               |
| DRIVER_SECRET_KEY          | Random key for jwt                               |
| EMAIL                      | Your email for sending emails                    |
| PASSWORD                   | Password for email                               |
| APP_HOSTNAME               | Application Hostname                             |
| APP_URL                    | Application URL                                  |

> You can use [Random Password Generator](https://www.avast.com/random-password-generator)

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 14.X.X

# Getting started

- Clone the repository

```
git clone  https://github.com/Yusfuu/MarocShip-Delivery.git
```

- Install dependencies

```
cd MarocShip-Delivery
yarn install
```

- Build the project

```
yarn build
```

- Run the project

```
yarn start:dev
```

- Kill the servers

```
yarn kill
```

## API Reference

#### Check the postman folder

[need help ?](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/)

# TypeScript + Node

The main purpose of this repository is to show a project setup and workflow for writing microservice. The Rest APIs will be using the Swagger (OpenAPI) Specification.

## Project Structure

The folder structure of this app is explained below:

| Name                 | Description                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| **.github/workflow** | Contains github actions allows you to automate your build, test, and deployment pipeline                 |
| **build**            | Contains the distributable (or output) from your TypeScript build.                                       |
| **src**              | Contains source code that will be compiled to the dist dir                                               |
| **test**             | Contains all individual units/components are tested in isolation                                         |
| **src/server.ts**    | Entry point to express app                                                                               |
| **src/config**       | Application configuration including environment-specific configs                                         |
| **src/controllers**  | Controllers define functions to serve various express routes.                                            |
| **src/lib**          | Common libraries to be used across your app.                                                             |
| **src/middlewares**  | Express middlewares which process the incoming requests before handling them down to the routes          |
| **src/routes**       | Contain all express routes, separated by module/area of application                                      |
| **src/models**       | Models define schemas that will be used in storing and retrieving data from Application database         |
| **src/utils**        | specific functions used throughout the App                                                               |
| Dockerfile           | Docker file for Build the app’s container image                                                          |
| ecosystem.config.js  | managing multiple applications with [PM2](https://pm2.keymetrics.io/docs/usage/application-declaration/) |
| tsconfig.json        | Configuring TypeScript compilation                                                                       |

### Scripts

All the different build steps are orchestrated via [yarn scripts](https://classic.yarnpkg.com/lang/en/docs/cli/run/).
Yarn scripts basically allow us to call (and chain) terminal commands via yarn.

| Yarn Script | Description                                                                     |
| ----------- | ------------------------------------------------------------------------------- |
| `start:dev` | Runs node on build/server.js                                                    |
| `build`     | Full build. Runs ALL build tasks                                                |
| `dev`       | Runs full build before starting all watch tasks. Can be invoked with `yarn dev` |
| `test`      | run units tests using [jest](https://jestjs.io/)                                |
| `kill`      | stop servers                                                                    |
| `monit`     | monitor the resource usage of your application                                  |

## Authors

- [@Youssef Hajjari](https://twitter.com/Yosufuu)
- [@Youness Hassoune](https://twitter.com/YounessHassoune)
