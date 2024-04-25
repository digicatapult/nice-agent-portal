import { Controller, Post, Route, SuccessResponse, Tags, Body } from 'tsoa'
import { injectable } from 'tsyringe'

import { CloudagentManager } from '../../lib/services/cloudagent.js'

import { logger } from '../../lib/logger.js'
const log = logger.child({ context: 'ConnectionController' })

@Route('api/connection')
@Tags('connection')
@injectable()
export class ConnectionController extends Controller {
  constructor(private cloudagent: CloudagentManager) {
    super()
  }

  /**
   * @summary Create a new connection.
   * @description If any existing connections for the did exists, delete and replace them with a single new one.
   */
  @SuccessResponse(204)
  @Post('/')
  public async post(@Body() body: { did: string }) {
    log.debug({
      msg: 'new request received',
      controller: '/connection',
      payload: body,
    })

    const { did } = body

    const connections = await this.cloudagent.getConnections()

    for (const { id, invitationDid } of connections) {
      if (invitationDid === did) {
        await this.cloudagent.deleteConnection(id)
      }
    }

    await this.cloudagent.receiveImplicitInvitation(did)
  }
}
