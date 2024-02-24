import { describe, before } from 'mocha'
import { Express } from 'express'
import { expect } from 'chai'

import createHttpServer from '../../src/server.js'
import { get } from '../helper/routeHelper.js'

describe('health check', () => {
  describe('happy path', function () {
    let app: Express

    before(async function () {
      app = await createHttpServer()
    })

    it('health check', async function () {
      const { status, body } = await get(app, '/health')
      expect(status).to.equal(200)
      expect(body).to.deep.equal({
        status: 'ok',
        version: process.env.npm_package_version,
        cloudagentIsInitialized: true,
      })
    })
  })
})
