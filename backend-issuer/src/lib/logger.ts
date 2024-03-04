import { pino, Logger } from 'pino'
import { container } from 'tsyringe'

import type { Env } from '../env.js'

const env = container.resolve<Env>('env')

export const logger: Logger = pino(
  {
    name: 'nice-agent-portal',
    timestamp: true,
    level: env.LOG_LEVEL,
  },
  process.stdout
)
