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
  CLOUDAGENT_PORT: envalid.port({ default: 3001 }),
  STATIC_ROOT: envalid.str({
    default: '/www',
    devDefault: '../frontend/build',
  }),
})
