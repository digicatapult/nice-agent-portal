import { describe, before } from 'mocha'
import { Express } from 'express'
import { expect } from 'chai'
import * as sinon from 'sinon'
import { container } from 'tsyringe'

import { Provisioner } from '../../src/lib/provisioner.js'
import createHttpServer from '../../src/server.js'
import { get } from '../helper/routeHelper.js'

describe('health check', () => {
  const provisioner = container.resolve(Provisioner)

  describe('happy path', function () {
    let app: Express

    before(async function () {
      sinon.stub(provisioner, 'provision').resolves()
      app = await createHttpServer()
    })

    after(() => {
      sinon.restore()
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
