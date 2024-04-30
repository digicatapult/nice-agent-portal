import { expect } from 'chai'
import request from 'supertest'
import { describe } from 'mocha'
import { KeyType, ConnectionRecord } from '@aries-framework/core'
import { getConfig } from './fixtures/config.js'

import { pollGetConnections } from './utils/shared.js'

describe('Messaging', async function () {
  const config = getConfig()
  const aliceClient = request(config.alice.portalUrl)
  const bobClient = request(config.bob.portalUrl)
  const aliceVeritableClient = request(config.alice.veritableUrl)
  const bobVeritableCLient = request(config.bob.veritableUrl)
  let bobTestDid: string | undefined = undefined
  let aliceTestDid: string | undefined = undefined

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

  after(async function () {
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
    it('Alice creates a connection with Bob & sends him a message.', async function () {
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

      aliceTestDid = bobConnectionRecord.theirDid
      bobTestDid = bobConnectionRecord.did

      //send message to Bob from alice
      await aliceClient
        .post('/messages')
        .send({
          message: {
            content: 'Alice says hi!',
          },
          did: aliceConnectionRecord.theirDid,
        })
        .expect(204)
    })
    it('Alice gets messages from her side to check if it has been sent.', async function () {
      const res = await aliceClient.get(`/messages`)

      expect(res.body).to.be.an('array').and.to.have.lengthOf(1)
      expect(res.body).to.deep.include({
        content: 'Alice says hi!',
        recipientDid: bobTestDid,
      })
    })
    it('Bob gets messages from his side to check if it has been received.', async function () {
      const res = await bobClient.get(`/messages`)
      expect(res.body).to.be.an('array').and.to.have.lengthOf(1)
      expect(res.body).to.deep.include({
        content: 'Alice says hi!',
        senderDid: aliceTestDid,
      })
    })
    it('Bob responds to message from Alice.', async function () {
      await bobClient
        .post('/messages')
        .send({
          message: {
            content: 'Bob says hi back!',
          },
          did: aliceTestDid,
        })
        .expect(204)
    })
    it('Alice gets messages from her side to check if she now also has response.', async function () {
      const res = await aliceClient.get(`/messages`)

      expect(res.body).to.be.an('array').and.to.have.lengthOf(2)
      expect(res.body).to.deep.include({
        content: 'Alice says hi!',
        recipientDid: bobTestDid,
      })
      expect(res.body).to.deep.include({
        content: 'Bob says hi back!',
        senderDid: bobTestDid,
      })
    })
  })
})
