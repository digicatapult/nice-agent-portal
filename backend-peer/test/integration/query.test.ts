import { describe, before } from 'mocha'
import { Express } from 'express'
import { expect } from 'chai'

import createHttpServer from '../../src/server.js'
import { post } from '../helper/routeHelper.js'
import { one, two } from '../fixtures/queryResponses.js'

describe('querying', () => {
  let app: Express

  before(async function () {
    app = await createHttpServer()
  })

  it('single query', async function () {
    const { status, body } = await post(app, '/query/receive', [
      {
        id: one.data[0].id,
      },
    ])
    expect(status).to.equal(200)
    expect(body).to.deep.equal(one)
  })

  it('single query - array key', async function () {
    const { status, body } = await post(app, '/query/receive', [
      {
        entities: one.data[0].entities,
      },
    ])
    expect(status).to.equal(200)
    expect(body).to.deep.equal(one)
  })

  it('two queries', async function () {
    const { status, body } = await post(app, '/query/receive', [
      {
        id: two.data[0].id,
      },
      {
        id: two.data[1].id,
      },
    ])
    expect(status).to.equal(200)
    expect(body).to.deep.equal(two)
  })

  it('empty query', async function () {
    const { status, body } = await post(app, '/query/receive', [])
    expect(status).to.equal(200)
    expect(body).to.deep.equal({
      data: [],
      metadata: {
        numberFound: '0/0',
      },
    })
  })

  it('bad query', async function () {
    const { status, body } = await post(app, '/query/receive', [
      {
        id: 'bla',
      },
    ])
    expect(status).to.equal(200)
    expect(body).to.deep.equal({
      data: [],
      metadata: {
        numberFound: '0/1',
      },
    })
  })
})
