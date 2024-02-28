import * as envalid from 'envalid'
import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: 'test/test.env' })
} else {
  dotenv.config({ path: process.env.DOTENV_CONFIG_PATH })
}

export default envalid.cleanEnv(process.env, {
  PORT: envalid.port({ default: 3000 }),
  LOG_LEVEL: envalid.str({ default: 'info', devDefault: 'debug' }),
  CLOUDAGENT_HOST: envalid.host({
    default: 'veritable',
    devDefault: 'localhost',
  }),
  CLOUDAGENT_PORT: envalid.port({ default: 3000, devDefault: 3010 }),
  DB_HOST: envalid.str({ default: 'postgres', devDefault: 'localhost' }),
  DB_PORT: envalid.port({ default: 5432 }),
  DB_USERNAME: envalid.str({ devDefault: 'postgres' }),
  DB_PASSWORD: envalid.str({ devDefault: 'postgres' }),
  DB_NAME: envalid.str({ default: 'nice-agent-portal' }),
  STATIC_ROOT: envalid.str({
    default: '/www',
    devDefault: '../frontend/build',
  }),
  ISSUER_HOST: envalid.host({
    default: 'nice-agent-issuer-portal',
    devDefault: 'localhost',
  }),
  ISSUER_PORT: envalid.port({ default: 3000, devDefault: 3002 }),
})
