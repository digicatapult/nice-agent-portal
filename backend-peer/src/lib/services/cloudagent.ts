import { singleton, container } from 'tsyringe'
import type {
  DidResolutionMetadata,
  DidDocumentMetadata,
  DidDocument,
  CredentialExchangeRecord,
  ImportDidOptions,
  ConnectionRecord,
  DidExchangeState,
} from '@aries-framework/core'
import type { DIDDocument } from 'did-resolver'

import type { Env } from '../../env.js'
import { ServiceUnavailable } from '../error-handler/index.js'

interface AgentInfo {
  label: string
  endpoints: string[]
  isInitialized: boolean
}

interface DidResolutionResultProps {
  didResolutionMetadata: DidResolutionMetadata
  didDocument: DIDDocument | null
  didDocumentMetadata: DidDocumentMetadata
}

interface DidCreateOptions {
  method?: string
  did?: string
  options?: { [x: string]: unknown }
  secret?: { [x: string]: unknown }
  didDocument?: DidDocument
}

type ImportDid = Omit<ImportDidOptions, 'privateKeys'> & {
  privateKeys: { keyType: string; privateKey: string }[]
}

interface GetConnectionParams {
  outOfBandId?: string
  alias?: string
  state?: DidExchangeState
  myDid?: string
  theirDid?: string
  theirLabel?: string
}

/**
 * @example "821f9b26-ad04-4f56-89b6-e2ef9c72b36e"
 */
export type RecordId = string

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

  createDid = async (
    body: DidCreateOptions
  ): Promise<DidResolutionResultProps> => {
    const res = await fetch(`${this.url_prefix}/dids/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const responseBody = await res.json()

    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }

    return responseBody as DidResolutionResultProps
  }

  importDid = async (body: ImportDid): Promise<DidResolutionResultProps> => {
    const res = await fetch(`${this.url_prefix}/dids/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const responseBody = await res.json()

    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }

    return responseBody as DidResolutionResultProps
  }

  acceptConnectionRequest = async (
    connectionId: string
  ): Promise<ConnectionRecord> => {
    const res = await fetch(
      `${this.url_prefix}/connections/${connectionId}/accept-request`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const responseBody = await res.json()

    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }

    return responseBody as ConnectionRecord
  }

  getCredentials = async (): Promise<CredentialExchangeRecord[]> => {
    const res = await fetch(`${this.url_prefix}/credentials`)

    const responseBody = await res.json()

    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }

    return responseBody as CredentialExchangeRecord[]
  }

  acceptCredentialOffer = async (
    credentialRecordId: RecordId
  ): Promise<DidResolutionResultProps> => {
    const res = await fetch(
      `${this.url_prefix}/credentials/${credentialRecordId}/accept-offer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ autoAcceptCredential: 'always' }),
      }
    )

    const responseBody = await res.json()

    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }

    return responseBody as DidResolutionResultProps
  }

  getConnections = async (
    params?: GetConnectionParams
  ): Promise<ConnectionRecord[]> => {
    const query = new URLSearchParams(params?.toString())

    const res = await fetch(`${this.url_prefix}/connections?${query}`)

    const responseBody = await res.json()

    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }

    return responseBody as ConnectionRecord[]
  }

  deleteConnection = async (connectionId: string) => {
    const res = await fetch(`${this.url_prefix}/connections/${connectionId}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }
  }
}
