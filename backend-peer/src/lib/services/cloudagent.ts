import { singleton, injectable, container } from 'tsyringe'
import {
  DidResolutionMetadata,
  DidDocumentMetadata,
  DidDocument,
  CredentialExchangeRecord,
  ImportDidOptions,
  ConnectionRecord,
  DidExchangeState,
  AriesFrameworkError,
  BasicMessageRecord,
  OutOfBandRecord,
} from '@aries-framework/core'
import type { DIDDocument } from 'did-resolver'

import type { Env } from '../../env.js'
import { ServiceUnavailable, InternalError } from '../error-handler/index.js'
import { Message } from '../../controllers/types.js'
import { EventType, NiceEventEmitter } from '../eventEmitter.js'

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
type ImplicitInvitationResponse = {
  outOfBandRecord: OutOfBandRecord
  connectionRecord: ConnectionRecord
}

/**
 * @example "821f9b26-ad04-4f56-89b6-e2ef9c72b36e"
 */
export type RecordId = string
@injectable()
@singleton()
export class CloudagentManager {
  private url_prefix: string
  private env: Env

  constructor(private eventEmitter: NiceEventEmitter) {
    this.env = container.resolve<Env>('env')
    this.url_prefix = `http://${this.env.CLOUDAGENT_HOST}:${this.env.CLOUDAGENT_PORT}`
  }

  getAgent = async (): Promise<AgentInfo> => {
    const res = await fetch(`${this.url_prefix}/agent`)

    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }

    const agentInfo = await res.json()
    return agentInfo as AgentInfo
  }

  receiveImplicitInvitation = async (
    did: string,
    waitUntilCompleted: boolean = false
  ) => {
    const requestBody = {
      did,
      handshakeProtocols: ['https://didcomm.org/connections/1.x'],
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

    if (res.status === 500) {
      const responseBody = (await res.json()) as AriesFrameworkError
      throw new InternalError(responseBody.message)
    }

    if (!res.ok) {
      throw new ServiceUnavailable('Error accepting implicit invitation')
    }
    const responseBody: ImplicitInvitationResponse =
      (await res.json()) as ImplicitInvitationResponse
    const connectionId = responseBody.connectionRecord.id
    if (waitUntilCompleted) {
      return new Promise<ConnectionRecord>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new InternalError(`Could not create a connection`))
        }, this.env.CONNECTION_REQUEST_TIMEOUT_MS)
        const connectionEventListener = (
          connectionRecord: ConnectionRecord
        ) => {
          if (
            connectionRecord.id === connectionId &&
            connectionRecord.state === 'completed'
          ) {
            clearTimeout(timeout)
            this.eventEmitter.off(EventType.Connection, connectionEventListener)
            return resolve(connectionRecord)
          }
        }
        this.eventEmitter.on(EventType.Connection, connectionEventListener)
      })
    } else {
      return responseBody.connectionRecord
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
  sendMessage = async (connectionId: string, body: Message) => {
    const res = await fetch(
      `${this.url_prefix}/basic-messages/${connectionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )

    if (res.status === 500) {
      const responseBody = (await res.json()) as AriesFrameworkError
      throw new InternalError(responseBody.message)
    }
    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }
  }
  getMessages = async (connectionId: string): Promise<BasicMessageRecord[]> => {
    const res = await fetch(`${this.url_prefix}/basic-messages/${connectionId}`)

    const responseBody = await res.json()
    if (res.status === 500) {
      const responseBody = (await res.json()) as AriesFrameworkError
      throw new InternalError(responseBody.message)
    }
    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }

    return responseBody as BasicMessageRecord[]
  }
}
