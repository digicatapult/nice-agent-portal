import 'reflect-metadata'
import './env.js'
import { Express } from 'express'
import { container } from 'tsyringe'

import Server from './server.js'
import type { Env } from './env.js'
import { logger } from './lib/logger.js'
;(async () => {
  const app: Express = await Server()
  const env = container.resolve<Env>('env')

  app.listen(env.PORT, () => {
    logger.info(`nice-agent-portal listening on ${env.PORT} port`)
  })
})()
