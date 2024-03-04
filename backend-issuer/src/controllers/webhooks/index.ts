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

import { InternalError } from '../../lib/error-handler/index.js'
import { CloudagentManager } from '../../lib/services/cloudagent.js'
import { Database } from '../../lib/db.js'
import { logger } from '../../lib/logger.js'
const log = logger.child({ context: 'WebhooksController' })

@Route('api/webhooks')
@Tags('webhooks')
@injectable()
export class WebhooksController extends Controller {
  constructor(
    private cloudagent: CloudagentManager,
    private db: Database
  ) {
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

    if (payload.state === 'completed' && payload.invitationDid) {
      let member
      try {
        member = await this.db.updateMember(
          {
            did: payload.invitationDid,
          },
          { connectionId: payload.id }
        )
      } catch (e) {
        throw new InternalError('Could not update connectionId')
      }
      log.info({
        msg: `Connection ${payload.id} established with ${payload.invitationDid}`,
      })
      const { credDefId } = await this.db.getConfig()
      await this.cloudagent.sendCredentialOffer(payload.id, credDefId, {
        companyName: member.companyName,
        companiesHouseNumber: member.companiesHouseNumber,
      })
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

    if (payload.state === 'done' && payload.connectionId) {
      try {
        await this.db.updateMember(
          {
            connectionId: payload.connectionId,
            status: 'approved',
          },
          { status: 'verified' }
        )
      } catch (e) {
        throw new InternalError('Could not set member status to verified')
      }
    }
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

  /**
   * @summary Receive Trust Ping events from Veritable
   */
  @SuccessResponse(204)
  @Post('/trust-ping')
  @Hidden()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async onTrustPingEvent(@Body() payload: { [key: string]: any }) {
    log.info({
      msg: 'new request received',
      controller: '/webhooks/trust-ping',
      payload,
    })
  }
}
