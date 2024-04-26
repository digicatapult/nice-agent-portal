import { expect } from 'chai'
import request from 'supertest'
import { describe } from 'mocha'
import { KeyType, ConnectionRecord } from '@aries-framework/core'

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

  afterEach(async function () {
    // clear all connections
    const { body: aliceConns } = await aliceVeritableClient.get(`/connections`)
    for (const { id } of aliceConns) {
      await aliceVeritableClient.delete(`/connections/${id}`)
    }
    const { body: bobConns } = await bobVeritableCLient.get(`/connections`)
    for (const { id } of bobConns) {
      await bobVeritableCLient.delete(`/connections/${id}`)
    }
  })

  describe('happy path', async function () {
    it('Alice creates a connection with Bob', async function () {
      await aliceClient
        .post('/connection')
        .send({ did: config.bob.did })
        .expect(204)

      // poll until a completed connection appears
      await pollGetConnections(
        config.alice.veritableUrl,
        (connections) =>
          connections.length === 1 && connections[0].state === 'completed'
      )

      const { body: aliceConnections } = await request(
        config.alice.veritableUrl
      ).get('/connections')

      const aliceConnectionRecord = aliceConnections[0] as ConnectionRecord
      expect(aliceConnectionRecord.invitationDid).to.equal(config.bob.did)

      // poll until a completed connection appears
      await pollGetConnections(
        config.bob.veritableUrl,
        (connections) =>
          connections.length === 1 && connections[0].state === 'completed'
      )

      const { body: bobConnections } = await request(
        config.bob.veritableUrl
      ).get(`/connections`)

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

      await pollGetConnections(
        config.alice.veritableUrl,
        (connections) =>
          connections.length === 1 && connections[0].state === 'completed'
      )

      const { body: aliceConnectionsFirst } = await request(
        config.alice.veritableUrl
      ).get('/connections')
      expect(aliceConnectionsFirst[0].invitationDid).to.equal(config.bob.did)

      // replace the connection
      await aliceClient
        .post('/connection')
        .send({ did: config.bob.did })
        .expect(204)

      await pollGetConnections(
        config.alice.veritableUrl,
        (connections) =>
          connections.length === 1 &&
          connections[0].id !== aliceConnectionsFirst[0].id &&
          connections[0].state === 'completed'
      )

      const { body: aliceConnectionsSecond } = await request(
        config.alice.veritableUrl
      ).get('/connections')
      expect(aliceConnectionsSecond[0].invitationDid).to.equal(config.bob.did)
    })
  })

  describe('sad path', async function () {
    it('500s if invalid DID', async function () {
      await aliceClient.post('/connection').send({ did: 'bla' }).expect(500)
    })
  })
})

const pollGetConnections = async (
  baseUrl: string,
  stopPollCondition: (connections: ConnectionRecord[]) => boolean,
  delay: number = 1000
) => {
  const poll = async (): Promise<void> => {
    const { body: connections } = await request(baseUrl).get('/connections')
    if (connections.length > 0 && stopPollCondition(connections)) {
      return
    }
    await new Promise((resolve) => setTimeout(resolve, delay))
    await poll()
  }

  await poll()
}
