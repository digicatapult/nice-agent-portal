import { injectable, singleton } from 'tsyringe'

import env from '../env.js'
import Database from './db.js'
import { CloudagentManager, Claims } from './services/cloudagent.js'
import { logger } from './logger.js'
const log = logger.child({ context: 'Provision' })

@injectable()
@singleton()
export class Provisioner {
  constructor(
    private cloudagent: CloudagentManager,
    private db: Database
  ) {}

  async provision() {
    let { did, schemaId, credDefId } = await this.db.getConfig()

    if (!did) {
      if (!env.DID || !env.PRIVATE_KEY) {
        throw new Error(
          'DID and private key not found in wallet, DID and PRIVATE_KEY environment variables must be specified at startup'
        )
      }
      log.info(`DID ${env.DID} not found in store, creating...`)
      const didImportPayload = {
        did: env.DID,
        privateKeys: [
          {
            keyType: 'ed25519',
            privateKey: env.PRIVATE_KEY,
          },
        ],
        overwrite: true,
      }
      await this.cloudagent.importDid(didImportPayload)
      did = env.DID
    }

    if (!schemaId || !(await this.cloudagent.isSchemaDefined(schemaId))) {
      log.info('Schema not found in store, creating...')
      const schemaPayload = {
        issuerId: did,
        version: '1.0',
        name: 'niceMemberSchema',
        attrNames: Object.getOwnPropertyNames(new Claims()),
      }
      schemaId = await this.cloudagent.createSchema(schemaPayload)
    }

    if (!credDefId || !(await this.cloudagent.isCredDefDefined(credDefId))) {
      log.info('Credential Definition not found in store, creating...')
      const credDefPayload = {
        tag: 'niceMemberCredDef',
        schemaId: schemaId,
        issuerId: did,
      }
      credDefId = await this.cloudagent.createCredDef(credDefPayload)
    }

    await this.db.updateConfig({ did, schemaId, credDefId })
    log.info({ msg: 'Provision completed, using:', did, schemaId, credDefId })
  }
}
