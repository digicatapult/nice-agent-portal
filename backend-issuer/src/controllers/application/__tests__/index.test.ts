import { container } from 'tsyringe'
import * as sinon from 'sinon'
import supertest from 'supertest'
import { Express } from 'express'

import type { Member } from '../../../controllers/types.js'
import createHttpServer from '../../../server.js'
import { Provisioner } from '../../../lib/provisioner.js'
import Database from '../../../lib/db.js'
import { CloudagentManager } from '../../../lib/services/cloudagent.js'

describe('application controller', () => {
  describe('POST /api/confirm-application', async () => {
    const db = container.resolve(Database)
    const cloudagent = container.resolve(CloudagentManager)
    const provisioner = container.resolve(Provisioner)
    let app: Express
    let testAgent: supertest.Agent
    let testMember: Member
    let verificationCode: string
    let getMemberStub: sinon.SinonStub
    let receiveImplicitInvitationStub: sinon.SinonStub

    before(async () => {
      sinon.stub(provisioner, 'provision').resolves()
      app = await createHttpServer()
      testAgent = supertest(app)
    })

    beforeEach(() => {
      testMember = {
        id: 123,
        companyName: "Alice's Art Supplies",
        companiesHouseNumber: 'i23olsd9',
        email: 'alice@example.com',
        status: 'approved',
        did: 'did:example:i23olsd9',
        verificationCode: '5120712c-585b-4f00-ac77-befad2b490af',
        createdAt: new Date('2023-01-12T08:07:42.741Z'),
        updatedAt: new Date('2023-01-14T12:43:04.283Z'),
      }
      verificationCode = Buffer.from(
        `${testMember.id}.${testMember.verificationCode}`
      ).toString('base64')
      getMemberStub = sinon.stub(db, 'getMember').resolves()
      getMemberStub
        .withArgs(
          sinon.match(({ id, verificationCode }) => {
            return (
              id === testMember.id &&
              verificationCode === testMember.verificationCode
            )
          })
        )
        .resolves(testMember)

      receiveImplicitInvitationStub = sinon
        .stub(cloudagent, 'receiveImplicitInvitation')
        .resolves()
    })

    afterEach(() => {
      sinon.restore()
    })

    after(() => {
      sinon.restore()
    })

    it('should fetch the member with the extracted id and DID', async () => {
      const expectedArg = {
        id: testMember.id,
        verificationCode: testMember.verificationCode,
      }

      await testAgent
        .post('/api/confirm-application')
        .send({ verificationCode })
        .expect(204)

      sinon.assert.calledWith(getMemberStub, expectedArg)
    })

    it("should call Veritable's receiveImplicitInvitation with the extracted DID", async () => {
      await testAgent
        .post('/api/confirm-application')
        .send({ verificationCode })
        .expect(204)

      sinon.assert.calledWith(receiveImplicitInvitationStub, testMember.did)
    })

    it('should return an error if the input cannot be correctly decoded', async () => {
      verificationCode = 'YmFkIHZlcmlmaWNhdGlvbiBjb2Rl'
      await testAgent
        .post('/api/confirm-application')
        .send({ verificationCode })
        .expect(400)
    })

    it("should return an error if the member doesn't exist", async () => {
      verificationCode = Buffer.from(
        `789.${testMember.verificationCode}`
      ).toString('base64')
      await testAgent
        .post('/api/confirm-application')
        .send({ verificationCode })
        .expect(400)
    })

    it('should return an error if the verification code is incorrect', async () => {
      verificationCode = Buffer.from(`${testMember.id}.bad-uuid`).toString(
        'base64'
      )
      await testAgent
        .post('/api/confirm-application')
        .send({ verificationCode })
        .expect(400)
    })

    it("should return an error if the member's status is not 'approved'", async () => {
      testMember.status = 'pending'
      await testAgent
        .post('/api/confirm-application')
        .send({ verificationCode })
        .expect(400)
    })
  })
})
