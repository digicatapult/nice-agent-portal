import { expect } from 'chai'
import request from 'supertest'

import { getConfig } from './fixtures/config.js'

describe('Onboarding', async function () {
  const config = getConfig()
  const aliceClient = request(config.alice.portalUrl)
  const issuerClient = request(config.issuer.portalUrl)
  const aliceVeritableClient = request(config.alice.veritableUrl)
  const issuerVeritableCLient = request(config.issuer.veritableUrl)
  let aliceId: number
  let verificationCode: string
  let aliceConnectionRecordId: string
  let issuerConnectionRecordId: string
  let aliceCredentialRecordId: string
  let issuerCredentialRecordId: string

  let failed = false

  beforeEach(function (done) {
    failed && this.skip()
    // pause between tests/retries to allow state to resolve on peers
    setTimeout(function () {
      done()
    }, 1000)
  })

  afterEach(function () {
    // flag to track suite failure
    failed = failed || this?.currentTest?.state === 'failed'
  })

  describe('happy path', async function () {
    const aliceDetails = {
      companyName: 'alice',
      companiesHouseNumber: '5j67rm6N',
      email: 'alice@example.com',
      did: config.alice.did,
    }

    it('Alice submits an application', async function () {
      const applicationPayload = {
        ...aliceDetails,
        privateKey: config.alice.privateKey,
      }

      await aliceClient
        .post('/application')
        .send(applicationPayload)

        .expect(204)
    })

    it("Issuer sees Alice's application with pending status", async function () {
      const res = await issuerClient
        .get('/admin/members')

        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body).to.have.lengthOf(1)
      expect(res.body[0]).to.include(aliceDetails)
      expect(res.body[0]).to.have.property('status', 'pending')

      aliceId = res.body[0].id
    })

    it("Issuer approves Alice's application", async function () {
      const res = await issuerClient
        .post(`/admin/members/${aliceId}/approve`)
        .expect(200)
        .expect('Content-Type', /json/)

      verificationCode = res.body.verificationCode
    })

    it("Issuer sees Alice's status as approved", async function () {
      const res = await issuerClient
        .get('/admin/members')

        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body).to.have.lengthOf(1)
      expect(res.body[0]).to.include(aliceDetails)
      expect(res.body[0]).to.have.property('status', 'approved')
    })

    it('Alice receives their verification code OOB and submits it to confirm their identity', async function () {
      await aliceClient
        .post('/confirmation')
        .send({ verificationCode })

        .expect(204)
    })

    it('Alice sees an established connection on Veritable', async function () {
      const res = await request(config.alice.veritableUrl)
        .get('/connections')

        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body).to.have.lengthOf(1)
      expect(res.body[0]).to.have.property('state', 'completed')
      aliceConnectionRecordId = res.body[0].id
    })

    it('Issuer sees an established connection on Veritable', async function () {
      const res = await request(config.issuer.veritableUrl)
        .get('/connections')

        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body).to.have.lengthOf(1)
      expect(res.body[0]).to.have.property('state', 'completed')
      issuerConnectionRecordId = res.body[0].id
    })

    it("Issuer sees Alice's status as verified", async function () {
      const res = await issuerClient
        .get('/admin/members')

        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body).to.have.lengthOf(1)
      expect(res.body[0]).to.include(aliceDetails)
      expect(res.body[0]).to.have.property('status', 'verified')
    })

    it('Alice sees their credential in Veritable', async function () {
      const res = await aliceVeritableClient
        .get('/credentials')

        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body).to.have.lengthOf(1)
      expect(res.body[0]).to.have.property('state', 'done')
      expect(res.body[0]).to.have.property('credentialAttributes')
      expect(res.body[0].credentialAttributes).to.satisfy(
        (atts: { [key: string]: string }[]) => {
          return atts.some(
            (att) => att.name === 'companyName' && att.value === 'alice'
          )
        }
      )
      aliceCredentialRecordId = res.body[0].id
    })

    it("Issuer sees Alice's credential in Veritable", async function () {
      const res = await issuerVeritableCLient
        .get('/credentials')

        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body).to.have.lengthOf(1)
      expect(res.body[0]).to.have.property('state', 'done')
      expect(res.body[0]).to.have.property('credentialAttributes')
      expect(res.body[0].credentialAttributes).to.satisfy(
        (atts: { [key: string]: string }[]) => {
          return atts.some(
            (att) => att.name === 'companyName' && att.value === 'alice'
          )
        }
      )
      issuerCredentialRecordId = res.body[0].id
    })
  })

  describe('cleanup', async function () {
    it("Issuer deletes Alice's member entry", async function () {
      await issuerClient
        .delete(`/admin/members/${aliceId}`)

        .expect(204)
    })

    it('Alice deletes their connection to Issuer', async function () {
      await aliceVeritableClient
        .delete(`/connections/${aliceConnectionRecordId}`)

        .expect(204)
    })

    it('Issuer deletes their connection to Alice', async function () {
      await issuerVeritableCLient
        .delete(`/connections/${issuerConnectionRecordId}`)

        .expect(204)
    })

    it('Alice deletes their credential record', async function () {
      await aliceVeritableClient
        .delete(`/credentials/${aliceCredentialRecordId}`)

        .expect(204)
    })

    it('Issuer deletes their credential record', async function () {
      await issuerVeritableCLient
        .delete(`/credentials/${issuerCredentialRecordId}`)
        .expect(204)
    })

    it('Verify all resources cleaned up', async function () {
      let res = await issuerClient
        .get(`/admin/members`)

        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body).to.have.lengthOf(0)

      res = await aliceVeritableClient
        .get(`/connections`)

        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body).to.have.lengthOf(0)

      res = await issuerVeritableCLient
        .get(`/connections`)

        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body).to.have.lengthOf(0)

      res = await aliceVeritableClient
        .get(`/credentials`)

        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body).to.have.lengthOf(0)

      res = await issuerVeritableCLient
        .get(`/credentials`)

        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body).to.have.lengthOf(0)
    })
  })
})
