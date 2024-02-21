## Description

OpenAPI service to manage profiles for the NICE agent and communication with [`veritable-cloudagent`](https://github.com/digicatapult/veritable-cloudagent).

## Configuration

Use a `.env` at root of this directory to set values for the following environment variables:

| variable        | required | default | description                                                                          |
| :-------------- | :------: | :-----: | :----------------------------------------------------------------------------------- |
| PORT            |    N     | `3000`  | The port for the API to listen on                                                    |
| LOG_LEVEL       |    N     | `debug` | Logging level. Valid values are [`trace`, `debug`, `info`, `warn`, `error`, `fatal`] |
| CLOUDAGENT_HOST |    Y     |    -    | The hostname / host of `veritable-cloudagent`                                        |
| CLOUDAGENT_PORT |    N     | `3001`  | The port of `veritable-cloudagent`                                                   |
