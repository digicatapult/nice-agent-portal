import { singleton, container } from 'tsyringe'

import type { Env } from '../../env.js'
import { ServiceUnavailable, InternalError } from '../error-handler/index.js'

type Address = string

export interface Document {
  id: string
  createdAt: string
  createdBy: Address
  attestation: string
  entites: string[]
  tags: string[]
  url: string
  entities: Address[]
  [key: string]: string | string[] | Address
}

interface AddressDetails {
  street: string[]
  zip: string
  city: string
  state: string
  country: string
}

export interface Entity {
  id: Address
  name: string
  address: AddressDetails
  createdAt: string
  updatedAt: string
}

export interface Attestation {
  id: string
  entities: Address[]
  signers: Address[]
  timestamp: number
  location: Address
}

export interface Location extends AddressDetails {
  id: string
}

const wrappedFetch = async (url: string): Promise<Response> => {
  try {
    return fetch(url)
  } catch (err) {
    throw new ServiceUnavailable('Error fetching chainvine API')
  }
}

@singleton()
export class Chainvine {
  private url_prefix: string

  constructor() {
    const env = container.resolve<Env>('env')
    this.url_prefix = `http://${env.CHAINVINE_HOST}:${env.CHAINVINE_PORT}`
  }

  getDocuments = async (): Promise<Document[]> => {
    const res = await wrappedFetch(`${this.url_prefix}/documents`)

    const responseBody = await res.json()

    if (!res.ok) {
      throw new InternalError(
        'Unknown error from chainvine API',
        responseBody as string
      )
    }

    const documents = responseBody
    return documents as Document[]
  }

  getEntities = async (): Promise<Entity[]> => {
    const res = await wrappedFetch(`${this.url_prefix}/entities`)

    const responseBody = await res.json()

    if (!res.ok) {
      throw new InternalError(
        'Unknown error from chainvine API',
        responseBody as string
      )
    }

    const entities = responseBody
    return entities as Entity[]
  }

  getAttestations = async (): Promise<Attestation[]> => {
    const res = await wrappedFetch(`${this.url_prefix}/attestations`)

    const responseBody = await res.json()

    if (!res.ok) {
      throw new InternalError(
        'Unknown error from chainvine API',
        responseBody as string
      )
    }

    const attestations = responseBody
    return attestations as Attestation[]
  }

  getLocations = async (): Promise<Location[]> => {
    const res = await wrappedFetch(`${this.url_prefix}/locations`)

    const responseBody = await res.json()

    if (!res.ok) {
      throw new InternalError(
        'Unknown error from chainvine API',
        responseBody as string
      )
    }

    const locations = responseBody
    return locations as Location[]
  }
}
