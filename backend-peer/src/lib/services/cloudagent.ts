import { singleton } from 'tsyringe'
import type {
  DidResolutionMetadata,
  DidDocumentMetadata,
  DidDocument,
  CredentialExchangeRecord,
  ImportDidOptions,
  ConnectionRecord,
} from '@aries-framework/core'
import type { DIDDocument } from 'did-resolver'

import env from '../../env.js'
import { HttpResponse } from '../error-handler/index.js'

const URL_PREFIX = `http://${env.CLOUDAGENT_HOST}:${env.CLOUDAGENT_PORT}`

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

/**
 * @example "821f9b26-ad04-4f56-89b6-e2ef9c72b36e"
 */
export type RecordId = string

@singleton()
export default class CloudagentManager {
  constructor() {}

  getAgent = async (): Promise<AgentInfo> => {
    const res = await fetch(`${URL_PREFIX}/agent`)

    if (res.ok) {
      const agentInfo = await res.json()
      return agentInfo as AgentInfo
    }

    throw new HttpResponse({ message: 'Error fetching cloud agent' })
  }

  createDid = async (
    body: DidCreateOptions
  ): Promise<DidResolutionResultProps> => {
    const res = await fetch(`${URL_PREFIX}/dids/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const responseBody = await res.json()

    if (res.ok) {
      return responseBody as DidResolutionResultProps
    }

    throw new HttpResponse({
      message: `Error fetching cloud agent - ${responseBody}`,
    })
  }

  importDid = async (body: ImportDid): Promise<DidResolutionResultProps> => {
    const res = await fetch(`${URL_PREFIX}/dids/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const responseBody = await res.json()

    if (res.ok) {
      return responseBody as DidResolutionResultProps
    }

    throw new HttpResponse({
      message: `Error fetching cloud agent - ${responseBody}`,
    })
  }

  acceptConnectionRequest = async (
    connectionId: string
  ): Promise<ConnectionRecord> => {
    const res = await fetch(
      `${URL_PREFIX}/connections/${connectionId}/accept-request`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const responseBody = await res.json()

    if (res.ok) {
      return responseBody as ConnectionRecord
    }

    throw new HttpResponse({
      message: `Error fetching cloud agent - ${responseBody}`,
    })
  }

  getCredentials = async (): Promise<CredentialExchangeRecord[]> => {
    const res = await fetch(`${URL_PREFIX}/credentials`)

    const responseBody = await res.json()

    if (res.ok) {
      return responseBody as CredentialExchangeRecord[]
    }

    throw new HttpResponse({
      message: `Error fetching cloud agent - ${responseBody}`,
    })
  }

  acceptCredentialOffer = async (
    credentialRecordId: RecordId
  ): Promise<DidResolutionResultProps> => {
    const res = await fetch(
      `${URL_PREFIX}/credentials/${credentialRecordId}/accept-offer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ autoAcceptCredential: 'always' }),
      }
    )

    const responseBody = await res.json()

    if (res.ok) {
      return responseBody as DidResolutionResultProps
    }

    throw new HttpResponse({
      message: `Error fetching cloud agent - ${responseBody}`,
    })
  }
}
