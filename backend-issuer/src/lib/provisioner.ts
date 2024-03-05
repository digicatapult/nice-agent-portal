import { injectable, singleton, container } from 'tsyringe'

import type { Env } from '../env.js'
import { Database } from './db.js'
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
    const env = container.resolve<Env>('env')
    let { did, schemaId, credDefId } = await this.db.getConfig()

    if (!did) {
      if (!env.DID || !env.PRIVATE_KEY) {
        throw new Error(
          'DID and private key not found in wallet, DID and PRIVATE_KEY environment variables must be specified at startup'
        )
      }
      log.info(`DID not found in store, importing...`)
      did = await this.importDid(env.DID, env.PRIVATE_KEY)
    }

    if (!schemaId || !(await this.cloudagent.isSchemaDefined(schemaId))) {
      log.info('Schema not found in store, creating...')
      schemaId = await this.createSchema(did)
      credDefId = await this.createCredDef(did, schemaId)
    }

    if (!credDefId || !(await this.cloudagent.isCredDefDefined(credDefId))) {
      log.info('Credential Definition not found in store, creating...')
      credDefId = await this.createCredDef(did, schemaId)
    }

    await this.db.updateConfig({ did, schemaId, credDefId })
    log.info({ msg: 'Provision completed:', did, schemaId, credDefId })
  }

  private async importDid(did: string, privateKey: string): Promise<string> {
    return this.cloudagent.importDid({
      did,
      privateKeys: [
        {
          keyType: 'ed25519',
          privateKey,
        },
      ],
      overwrite: true,
    })
  }

  private async createSchema(issuerId: string): Promise<string> {
    return this.cloudagent.createSchema({
      issuerId,
      version: '1.0',
      name: 'niceMemberSchema',
      attrNames: Object.getOwnPropertyNames(new Claims()),
    })
  }

  private async createCredDef(
    issuerId: string,
    schemaId: string
  ): Promise<string> {
    return await this.cloudagent.createCredDef({
      issuerId,
      schemaId,
      tag: 'niceMemberCredDef',
    })
  }
}
