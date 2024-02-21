## Description

OpenAPI service to manage profiles for the NICE agent and communication with [`veritable-cloudagent`](https://github.com/digicatapult/veritable-cloudagent).

## Configuration

Use a `.env` at root of the repository to set values for the following environment variables.

| variable        | required | default | description                                                                          |
| :-------------- | :------: | :-----: | :----------------------------------------------------------------------------------- |
| PORT            |    N     | `3001`  | The port for the API to listen on                                                    |
| LOG_LEVEL       |    N     | `debug` | Logging level. Valid values are [`trace`, `debug`, `info`, `warn`, `error`, `fatal`] |
| CLOUDAGENT_HOST |    Y     |    -    | The hostname / host of `veritable-cloudagent`                                        |
| CLOUDAGENT_PORT |    N     | `3001`  | The port of `veritable-cloudagent`                                                   |

## Getting started

Start at the root of the repository

```sh
# start dependencies
docker compose up -d
# change to backend directory
cd backend
# install packages
npm i
# run migrations
npm run db:migrate
# start service in dev mode. In order to start in full - npm start
npm run dev
```

View OpenAPI documentation for all routes with Swagger:

```
localhost:3000/docs/
```

## Tests

Integration tests are executed by calling:

```sh
npm run test:integration
```

Unit tests are executed by calling:

```sh
npm run test:unit
```
