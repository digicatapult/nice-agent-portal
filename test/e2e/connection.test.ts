import { expect } from 'chai'
import request from 'supertest'
import { describe } from 'mocha'
import { KeyType, ConnectionRecord } from '@aries-framework/core'
import { setTimeout } from 'timers/promises'

import { getConfig } from './fixtures/config.js'

describe('Connection', async function () {
  const config = getConfig()
  const aliceClient = request(config.alice.portalUrl)
  const aliceVeritableClient = request(config.alice.veritableUrl)
  const bobVeritableCLient = request(config.bob.veritableUrl)

  before(async function () {
    // import dids on Alice and Bob
    await request(config.alice.veritableUrl)
      .post('/dids/import')
      .send({
        did: config.alice.did,
        privateKeys: [
          {
            keyType: KeyType.Ed25519,
            privateKey: config.alice.privateKey,
          },
        ],
        overwrite: true,
      })
      .set('Accept', 'application/json')
      .expect(200)

    await request(config.bob.veritableUrl)
      .post('/dids/import')
      .send({
        did: config.bob.did,
        privateKeys: [
          {
            keyType: KeyType.Ed25519,
            privateKey: config.bob.privateKey,
          },
        ],
        overwrite: true,
      })
      .set('Accept', 'application/json')
      .expect(200)
  })

  // beforeEach(function (done) {
  //   failed && this.skip()
  //   // pause between tests/retries to allow state to resolve on peers
  //   setTimeout(function () {
  //     done()
  //   }, 1000)
  // })

  afterEach(async function () {
    // clear all connections
    const { body: aliceConns } = await aliceVeritableClient.get(`/connections`)
    for (const { id } of aliceConns) {
      await aliceVeritableClient.delete(`/connections/${id}`)
    }
    const { body: bobConns } = await bobVeritableCLient.get(`/connections`)
    for (const { id } of bobConns) {
      await aliceVeritableClient.delete(`/connections/${id}`)
    }
  })

  describe('happy path', async function () {
    it('Alice creates a connection with Bob', async function () {
      await aliceClient
        .post('/connection')
        .send({ did: config.bob.did })
        .expect(204)

      await setTimeout(1000) // wait for connection to complete

      const { body: aliceConnections } = await request(
        config.alice.veritableUrl
      )
        .get('/connections')
        .expect(200)

      expect(aliceConnections).to.have.lengthOf(1)
      const aliceConnectionRecord = aliceConnections[0] as ConnectionRecord
      expect(aliceConnectionRecord.invitationDid).to.equal(config.bob.did)
      expect(aliceConnectionRecord.state).to.equal('completed')

      const { body: bobConnections } = await request(config.bob.veritableUrl)
        .get(`/connections?theirDid=${aliceConnectionRecord.did}`)
        .expect(200)

      const bobConnectionRecord = bobConnections[0] as ConnectionRecord
      expect(bobConnectionRecord.state).to.equal('completed')
      expect(bobConnectionRecord.did).to.equal(aliceConnectionRecord.theirDid)
    })

    it('Alice replaces old connection with Bob', async function () {
      // create a connection to be replaced
      await aliceClient
        .post('/connection')
        .send({ did: config.bob.did })
        .expect(204)

      await setTimeout(1000) // wait for connection to complete

      const { body: aliceConnectionsFirst } = await request(
        config.alice.veritableUrl
      )
        .get('/connections')
        .expect(200)

      expect(aliceConnectionsFirst).to.have.lengthOf(1)
      expect(aliceConnectionsFirst[0].state).to.equal('completed')

      // replace the connection
      await aliceClient
        .post('/connection')
        .send({ did: config.bob.did })
        .expect(204)

      await setTimeout(1000) // wait for connection to complete

      const { body: aliceConnectionsSecond } = await request(
        config.alice.veritableUrl
      )
        .get('/connections')
        .expect(200)

      expect(aliceConnectionsSecond).to.have.lengthOf(1)
      expect(aliceConnectionsSecond[0].state).to.equal('completed')

      expect(aliceConnectionsFirst[0].id).to.not.equal(
        aliceConnectionsSecond[0]
      )
    })
  })

  describe('sad path', async function () {
    it('400s if invalid DID', async function () {
      await aliceClient.post('/connection').send({ did: 'bla' }).expect(400)
    })
  })
})
