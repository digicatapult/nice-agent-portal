import { expect } from 'chai'
import request from 'supertest'
import { describe } from 'mocha'
import { ConnectionRecord } from '@aries-framework/core'
import { getConfig } from './fixtures/config.js'

import { importDids } from './utils/setup.js'

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
    await importDids()
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
        .post('/messages')
        .send({
          message: {
            content: 'Alice says hi!',
          },
          did: config.bob.did,
        })
        .expect(204)
      const { body: bobConnections } = await request(
        config.bob.veritableUrl
      ).get(`/connections`)

      const bobConnectionRecord = bobConnections[0] as ConnectionRecord
      expect(bobConnectionRecord.state).to.equal('completed')

      aliceTestDid = bobConnectionRecord.theirDid
      bobTestDid = bobConnectionRecord.did
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
  describe('sad path', async function () {
    it('500s if invalid DID', async function () {
      const res = await bobClient.post('/messages').send({
        message: {
          content: 'Bob says hi back!',
        },
        did: 'blah',
      })

      expect(res.statusCode).to.be.equal(500)
    })
  })
})
