import { Controller, Post, Route, SuccessResponse, Tags, Body, Get } from 'tsoa'
import { injectable } from 'tsyringe'

import { CloudagentManager } from '../../lib/services/cloudagent.js'

import { logger } from '../../lib/logger.js'
import { Message } from '../types.js'
import { DidExchangeState } from '@aries-framework/core'
const log = logger.child({ context: 'MessagesController' })

@Route('api/messages')
@Tags('messages')
@injectable()
export class MessagesController extends Controller {
  constructor(private cloudagent: CloudagentManager) {
    super()
  }

  /**
   * @summary Send a new message.
   * @description Check if connections exist if not, create one, then send message.
   */
  @SuccessResponse(204)
  @Post('/')
  public async post(@Body() body: { did: string; message: Message }) {
    log.debug({
      msg: 'new request received',
      controller: '/messages',
      payload: body,
    })

    const { did, message } = body
    const connections = await this.cloudagent.getConnections()
    let connectionId: string | null = null

    for (const { id, invitationDid, state } of connections) {
      if (invitationDid === did && state == 'completed') {
        connectionId = id
      }
    }
    if (connectionId == null) {
      //create a connection if one does not exist
      await this.cloudagent.receiveImplicitInvitation(did)
    }
    console.log('-------------------')
    console.log(connectionId)
    //we need to pool for connection to check if it created?
    if (connectionId == null) {
      throw new Error('Connection not found and failed to create.')
    }
    return await this.cloudagent.sendMessage(connectionId, message)
  }

  /**
   * @summary Get all messages.
   * @description Get all open connections and all messages and
   */
  @SuccessResponse(200)
  @Get('/')
  public async get() {
    log.info({ msg: 'Getting all messages', controller: '/messages' })
    let allMessages: Message[] = []
    try {
      const connections = await this.cloudagent.getConnections({
        state: DidExchangeState.Completed,
      })
      const completedConnections = connections.filter(
        (obj) => obj.state === 'completed'
      )
      console.log(completedConnections)
      for (const { id, did } of completedConnections) {
        const messagesperId = await this.cloudagent.getMessages(id)
        for (const { content } of messagesperId) {
          allMessages.push({ content: content, senderDid: did })
        }
      }
      return allMessages
    } catch (e) {
      throw new Error('There has been an issue when getting messages.')
    }
  }
}
