import { container } from 'tsyringe'
import * as envalid from 'envalid'
import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: 'test/test.env' })
} else if (process.env.DOTENV_FILE_PATHS) {
  dotenv.config({ path: process.env.DOTENV_FILE_PATHS.split(' ') })
}

const env = envalid.cleanEnv(process.env, {
  PORT: envalid.port({ default: 3000 }),
  LOG_LEVEL: envalid.str({ default: 'info', devDefault: 'debug' }),
  CLOUDAGENT_HOST: envalid.host({
    default: 'veritable',
    devDefault: 'localhost',
  }),
  CLOUDAGENT_PORT: envalid.port({ default: 3000, devDefault: 3010 }),
  DB_HOST: envalid.str({ default: 'postgres', devDefault: 'localhost' }),
  DB_PORT: envalid.port({ default: 5432, devDefault: 3022 }),
  DB_USERNAME: envalid.str({ devDefault: 'postgres' }),
  DB_PASSWORD: envalid.str({ devDefault: 'postgres' }),
  DB_NAME: envalid.str({ default: 'nice-agent-portal' }),
  STATIC_ROOT: envalid.str({
    default: '/www',
    devDefault: '../frontend/build',
  }),
  DID: envalid.str({ default: '' }), // allow empty if already stored in wallet
  PRIVATE_KEY: envalid.str({ default: '' }), // allow empty if already stored in wallet
})

export type Env = typeof env

container.register<Env>('env', { useValue: env })
