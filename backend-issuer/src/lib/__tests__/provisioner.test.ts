import { container } from 'tsyringe'
import * as sinon from 'sinon'

import type { Env } from '../../env.js'
import { Database } from '../../lib/db.js'
import { CloudagentManager } from '../../lib/services/cloudagent.js'

import { Provisioner } from '../../lib/provisioner.js'

const originalEnv = container.resolve<Env>('env')

const setEnv = (newEnv: Partial<Env>) => {
  container.registerInstance<Env>('env', {
    ...originalEnv,
    ...newEnv,
  })
}

const restoreEnv = () => {
  container.registerInstance<Env>('env', originalEnv)
}

describe('Provisioner', async () => {
  describe('provision', async () => {
    let db: Database
    let cloudagent: CloudagentManager
    let provisioner: Provisioner
    let getConfigStub: sinon.SinonStubbedMember<Database['getConfig']>
    let importDidStub: sinon.SinonStubbedMember<CloudagentManager['importDid']>
    let isSchemaDefinedStub: sinon.SinonStubbedMember<
      CloudagentManager['isSchemaDefined']
    >
    let createSchemaStub: sinon.SinonStubbedMember<
      CloudagentManager['createSchema']
    >
    let isCredDefDefinedStub: sinon.SinonStubbedMember<
      CloudagentManager['isCredDefDefined']
    >
    let createCredDefStub: sinon.SinonStubbedMember<
      CloudagentManager['createCredDef']
    >
    let updateConfigStub: sinon.SinonStubbedMember<Database['updateConfig']>

    const mockDid = 'did:mock:somedid'
    const mockSchemaId = 'abc123'
    const mockCredDefId = 'xyz789'
    const mockEnv = {
      DID: 'did:mock:env',
      PRIVATE_KEY: 'privateKeyEnv',
    }

    beforeEach(() => {
      container.clearInstances()
      setEnv(mockEnv)
      db = container.resolve(Database)
      cloudagent = container.resolve(CloudagentManager)
      provisioner = container.resolve(Provisioner)

      getConfigStub = sinon.stub(db, 'getConfig').resolves({
        did: mockDid,
        schemaId: mockSchemaId,
        credDefId: mockCredDefId,
      })
      importDidStub = sinon.stub(cloudagent, 'importDid').resolves(mockDid)
      isSchemaDefinedStub = sinon
        .stub(cloudagent, 'isSchemaDefined')
        .resolves(true)
      createSchemaStub = sinon
        .stub(cloudagent, 'createSchema')
        .resolves(mockSchemaId)
      isCredDefDefinedStub = sinon
        .stub(cloudagent, 'isCredDefDefined')
        .resolves(true)
      createCredDefStub = sinon
        .stub(cloudagent, 'createCredDef')
        .resolves(mockCredDefId)
      updateConfigStub = sinon.stub(db, 'updateConfig').resolves()
    })

    afterEach(() => {
      restoreEnv()
      sinon.restore()
    })

    it('should get existing config from the database', async () => {
      await provisioner.provision()

      sinon.assert.calledOnce(getConfigStub)
    })

    it('should import a DID if none exists in the database', async () => {
      getConfigStub.resolves({
        schemaId: mockSchemaId,
        credDefId: mockCredDefId,
      })

      await provisioner.provision()

      sinon.assert.calledOnce(importDidStub)
      sinon.assert.calledWithMatch(
        importDidStub,
        sinon.match((arg) => {
          return (
            arg.did === mockEnv.DID &&
            arg.privateKeys[0].privateKey === mockEnv.PRIVATE_KEY
          )
        })
      )
    })

    it('should create a new schema and credential definition if no schema exists in the database', async () => {
      getConfigStub.resolves({ did: mockDid, credDefId: mockCredDefId })

      await provisioner.provision()

      sinon.assert.calledOnce(createSchemaStub)
      sinon.assert.calledOnce(createCredDefStub)
    })

    it("should create a new schema and credential definition if the schema doesn't in Veritable", async () => {
      isSchemaDefinedStub.resolves(false)

      await provisioner.provision()

      sinon.assert.calledOnce(createSchemaStub)
      sinon.assert.calledOnce(createCredDefStub)
    })

    it('should create a new credential definition if none exists in the database', async () => {
      getConfigStub.resolves({ did: mockDid, schemaId: mockSchemaId })

      await provisioner.provision()

      sinon.assert.calledOnce(createCredDefStub)
    })

    it("should create a new credential definition if the credential definition doesn't exist in Veritable", async () => {
      isCredDefDefinedStub.resolves(false)

      await provisioner.provision()

      sinon.assert.calledOnce(createCredDefStub)
    })

    it('should not import or create any resources if all exist in the database', async () => {
      getConfigStub.resolves({
        did: mockDid,
        schemaId: mockSchemaId,
        credDefId: mockCredDefId,
      })

      await provisioner.provision()

      sinon.assert.notCalled(importDidStub)
      sinon.assert.notCalled(createSchemaStub)
      sinon.assert.notCalled(createCredDefStub)
    })

    it('should always update the config in the database', async () => {
      await provisioner.provision()

      sinon.assert.calledOnce(updateConfigStub)
    })
  })
})
