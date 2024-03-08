import { singleton, container } from 'tsyringe'

import type { Env } from '../../env.js'
import { ServiceUnavailable } from '../error-handler/index.js'
import { logger } from '../../lib/logger.js'
const log = logger.child({ context: 'CloudagentManager' })

interface AgentInfo {
  label: string
  endpoints: string[]
  isInitialized: boolean
}

interface ImportDid {
  did: string
  privateKeys: { keyType: string; privateKey: string }[]
  overwrite?: boolean
}

type ObjectWithId = { [key: string]: unknown } & { id: string }

type ObjectWithDidDocument = { [key: string]: unknown } & {
  didDocument: ObjectWithId
}

interface IClaims {
  companyName: string
  companiesHouseNumber: string
}

export class Claims implements IClaims {
  constructor(
    public companyName: string = '',
    public companiesHouseNumber: string = ''
  ) {}
}

@singleton()
export class CloudagentManager {
  private url_prefix: string

  constructor() {
    const env = container.resolve<Env>('env')
    this.url_prefix = `http://${env.CLOUDAGENT_HOST}:${env.CLOUDAGENT_PORT}`
  }

  getAgent = async (): Promise<AgentInfo> => {
    const res = await fetch(`${this.url_prefix}/agent`)

    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }

    const agentInfo = await res.json()
    return agentInfo as AgentInfo
  }

  receiveImplicitInvitation = async (did: string) => {
    const requestBody = {
      did,
      handshakeProtocols: ['https://didcomm.org/connections/1.0'],
      autoAcceptConnection: true,
    }

    const res = await fetch(
      `${this.url_prefix}/oob/receive-implicit-invitation`,
      {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        method: 'POST',
      }
    )

    if (!res.ok) {
      throw new ServiceUnavailable('Error accepting implicit invitation')
    }
  }

  importDid = async (body: ImportDid) => {
    const res = await fetch(`${this.url_prefix}/dids/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new ServiceUnavailable(`Error fetching cloud agent`)
    }

    const {
      didDocument: { id },
    } = (await res.json()) as ObjectWithDidDocument

    log.info(`DID imported ${id}`)

    return id
  }

  isSchemaDefined = async (id: string) => {
    const res = await fetch(
      `${this.url_prefix}/schemas/${encodeURIComponent(id)}`,
      {
        signal: AbortSignal.timeout(3000),
      }
    )
    try {
      if (!res.ok) {
        throw new ServiceUnavailable('Error fetching cloud agent')
      }

      const schema = (await res.json()) as ObjectWithId
      if (!schema.attrNames) {
        throw new Error('Schema not defined')
      }
    } catch (e) {
      return false
    }
    return true
  }

  createSchema = async (schema: {
    issuerId: string
    name: string
    version: string
    attrNames: string[]
  }) => {
    const res = await fetch(`${this.url_prefix}/schemas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(schema),
    })

    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }

    const { id } = (await res.json()) as ObjectWithId

    if (!id) {
      throw new ServiceUnavailable('Error creating schema')
    }

    log.info(`Schema created ${id}`)

    return id
  }

  isCredDefDefined = async (id: string) => {
    const res = await fetch(
      `${this.url_prefix}/credential-definitions/${encodeURIComponent(id)}`,
      { signal: AbortSignal.timeout(3000) }
    )
    try {
      if (!res.ok) {
        throw new ServiceUnavailable('Error fetching cloud agent')
      }

      const credDef = (await res.json()) as ObjectWithId
      if (!credDef.schemaId) {
        throw new Error('Credential definitions not defined')
      }
    } catch (e) {
      return false
    }
    return true
  }

  createCredDef = async (credDef: {
    tag: string
    schemaId: string
    issuerId: string
  }) => {
    const res = await fetch(`${this.url_prefix}/credential-definitions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credDef),
    })

    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }

    const { id } = (await res.json()) as ObjectWithId

    if (!id) {
      throw new ServiceUnavailable('Error creating credential definition')
    }

    log.info(`Credential Definition created ${id}`)

    return id
  }

  sendCredentialOffer = async (
    connectionId: string,
    credDefId: string,
    claims: IClaims
  ) => {
    const credentialOffer = {
      protocolVersion: 'v2',
      credentialFormats: {
        anoncreds: {
          credentialDefinitionId: credDefId,
          attributes: Object.entries(claims).map(([name, value]) => ({
            name,
            value,
          })),
        },
      },
      autoAcceptCredential: 'always',
      connectionId,
    }

    const res = await fetch(`${this.url_prefix}/credentials/offer-credential`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentialOffer),
    })

    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }

    const { id } = (await res.json()) as ObjectWithId

    log.info(`Credential offer sent ${id} to connection ${connectionId}`)
  }
}
