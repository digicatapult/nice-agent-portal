import { Env } from '../../env.js'
import { container, injectable, singleton } from 'tsyringe'
import { DrpcRequestObject } from '../../controllers/drpc/types.js'
import {
  BadRequest,
  InternalError,
  ServiceUnavailable,
} from '../error-handler/index.js'

/**
 * @example "821f9b26-ad04-4f56-89b6-e2ef9c72b36e"
 */
export type RecordId = string

const wrappedFetch = async (
  url: string,
  options?: {
    method?: string
    body?: object | undefined
    headers?: object
  }
): Promise<Response> => {
  try {
    const res = await fetch(url, {
      method: options?.method ? options.method.toUpperCase() : 'GET',
      body: options?.body ? JSON.stringify(options.body) : undefined,
      headers: {
        ...(options?.headers ? options.headers : {}),
      },
    })
    return res
  } catch (err) {
    throw new ServiceUnavailable('Error fetching cloud agent')
  }
}
@injectable()
@singleton()
export class FetchAiAdapterManager {
  private url_prefix: string
  private env: Env

  //   constructor(private eventEmitter: NiceEventEmitter) {
  constructor() {
    this.env = container.resolve<Env>('env')
    this.url_prefix = `http://${this.env.NICE_FETCH_AI_ADAPTER_HOST}:${this.env.NICE_FETCH_AI_ADAPTER_PORT_HOST}`
  }
  sendRequestToAdapter = async (body: DrpcRequestObject) => {
    const res = await wrappedFetch(`${this.url_prefix}/posts/send-query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    const responseBody = await res.json()

    if (res.status === 400) {
      throw new BadRequest(responseBody as string)
    }

    if (!res.ok) {
      if (responseBody.detail) {
        throw new InternalError(
          `Error in adapter: ${responseBody.detail}`,
          responseBody as string
        )
      } else {
        throw new InternalError(
          `Unknown error in adapter.`,
          responseBody as string
        )
      }
    }

    return responseBody
  }
}
