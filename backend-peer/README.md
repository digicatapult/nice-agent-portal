## Description

OpenAPI service to manage profiles for the NICE agent and communication with [`veritable-cloudagent`](https://github.com/digicatapult/veritable-cloudagent).

## Configuration

Use a `.env` at root of this directory to set values for the following environment variables:

| variable        | required |       default       | description                                                                          |
| :-------------- | :------: | :-----------------: | :----------------------------------------------------------------------------------- |
| PORT            |    N     |       `3000`        | The port for the API to listen on                                                    |
| LOG_LEVEL       |    N     |       `debug`       | Logging level. Valid values are [`trace`, `debug`, `info`, `warn`, `error`, `fatal`] |
| CLOUDAGENT_HOST |    Y     |          -          | The hostname / host of `veritable-cloudagent`                                        |
| CLOUDAGENT_PORT |    N     |       `3001`        | The port of `veritable-cloudagent`                                                   |
| DB_PORT         |    N     |       `5432`        | The port for the database                                                            |
| DB_HOST         |    Y     |          -          | The database hostname / host                                                         |
| DB_NAME         |    N     | `nice-agent-portal` | The database name                                                                    |
| DB_USERNAME     |    Y     |          -          | The database username                                                                |
| DB_PASSWORD     |    Y     |          -          | The database password                                                                |

## Database

Make sure postgres is running with`docker compose up -d` at root of the repository. The database schema is managed using `prisma` located at `/prisma/schema.prisma`.

```sh
# apply migrations to the database
npm run db:deploy

# create new migration after updating schema
npm run db:dev

## reset database and apply all migrations, all data will be lost
npm run db:reset
```
