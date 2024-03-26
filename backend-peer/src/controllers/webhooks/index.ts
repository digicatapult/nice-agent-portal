import {
  Controller,
  Body,
  Post,
  Route,
  SuccessResponse,
  Tags,
  Hidden,
} from 'tsoa'
import { injectable } from 'tsyringe'

import { CloudagentManager } from '../../lib/services/cloudagent.js'
import { logger } from '../../lib/logger.js'
const log = logger.child({ context: 'WebhooksController' })

@Route('api/webhooks')
@Tags('webhooks')
@injectable()
export class WebhooksController extends Controller {
  constructor(private cloudagent: CloudagentManager) {
    super()
  }

  /**
   * @summary Receive Basic Message events from Veritable
   */
  @SuccessResponse(204)
  @Post('/basic-messages')
  @Hidden()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async onBasicMessageEvent(@Body() payload: { [key: string]: any }) {
    log.info({
      msg: 'new request received',
      controller: '/webhooks/basic-messages',
      payload,
    })
  }

  /**
   * @summary Receive Connection events from Veritable
   */
  @SuccessResponse(204)
  @Post('/connections')
  @Hidden()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async onConnectionEvent(@Body() payload: { [key: string]: any }) {
    log.info({
      msg: 'new request received',
      controller: '/webhooks/connections',
      payload,
    })

    if (payload.state === 'request-received' && payload.id) {
      await this.cloudagent.acceptConnectionRequest(payload.id)
    }
  }

  /**
   * @summary Receive Credential events from Veritable
   */
  @SuccessResponse(204)
  @Post('/credentials')
  @Hidden()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async onCredentialEvent(@Body() payload: { [key: string]: any }) {
    log.info({
      msg: 'new request received',
      controller: '/webhooks/credentials',
      payload,
    })
  }

  /**
   * @summary Receive Proof events from Veritable
   */
  @SuccessResponse(204)
  @Post('/proofs')
  @Hidden()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async onProofEvent(@Body() payload: { [key: string]: any }) {
    log.info({
      msg: 'new request received',
      controller: '/webhooks/proofs',
      payload,
    })
  }
}
