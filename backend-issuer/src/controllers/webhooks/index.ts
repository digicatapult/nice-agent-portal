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

import { logger } from '../../lib/logger.js'
import { InternalError } from '../../lib/error-handler/index.js'
import Database from '../../lib/db.js'

@Route('api/webhooks')
@Tags('webhooks')
@injectable()
export class WebhooksController extends Controller {
  constructor(private db: Database) {
    super()
  }

  /**
   * @summary Confirm membership with received verification code
   */
  @SuccessResponse(204)
  @Post('/basic-messages')
  @Hidden()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async onBasicMessageEvent(@Body() payload: { [key: string]: any }) {
    logger.info({
      msg: 'new request received',
      controller: '/webhooks/basic-messages',
      payload,
    })
  }

  /**
   * @summary Submit membership application
   */
  @SuccessResponse(204)
  @Post('/connections')
  @Hidden()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async onConnectionEvent(@Body() payload: { [key: string]: any }) {
    logger.info({
      msg: 'new request received',
      controller: '/webhooks/connections',
      payload,
    })

    if (payload.state === 'completed' && payload.invitationDid) {
      try {
        await this.db.updateMember(
          {
            did: payload.invitationDid,
            status: 'approved',
          },
          { status: 'verified' }
        )
      } catch (e) {
        throw new InternalError('Could not update status')
      }
    }
  }

  /**
   * @summary Confirm membership with received verification code
   */
  @SuccessResponse(204)
  @Post('/credentials')
  @Hidden()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async onCredentialEvent(@Body() payload: { [key: string]: any }) {
    logger.info({
      msg: 'new request received',
      controller: '/webhooks/credentials',
      payload,
    })
  }

  /**
   * @summary Confirm membership with received verification code
   */
  @SuccessResponse(204)
  @Post('/proofs')
  @Hidden()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async onProofEvent(@Body() payload: { [key: string]: any }) {
    logger.info({
      msg: 'new request received',
      controller: '/webhooks/proofs',
      payload,
    })
  }
}
