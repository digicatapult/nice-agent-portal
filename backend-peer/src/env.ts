import * as envalid from 'envalid'
import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: 'test/test.env' })
} else {
  dotenv.config()
}

export default envalid.cleanEnv(process.env, {
  PORT: envalid.port({ default: 3000 }),
  LOG_LEVEL: envalid.str({ default: 'info', devDefault: 'debug' }),
  CLOUDAGENT_HOST: envalid.host({ devDefault: 'localhost' }),
  CLOUDAGENT_PORT: envalid.port({ default: 3000, devDefault: 3010 }),
  DB_HOST: envalid.str({ default: 'postgres', devDefault: 'localhost' }),
  DB_PORT: envalid.port({ default: 5432 }),
  DB_USERNAME: envalid.str({ default: 'postgres' }),
  DB_PASSWORD: envalid.str({ default: 'postgres' }),
  DB_NAME: envalid.str({ default: 'nice-agent-portal' }),
  STATIC_ROOT: envalid.str({
    default: '/www',
    devDefault: '../frontend/build',
  }),
  NICE_AGENT_ROLE: envalid.str({ choices: ['peer', 'issuer'], default: 'peer' }),
})
