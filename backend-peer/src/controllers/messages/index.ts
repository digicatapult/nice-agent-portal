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
    try {
      const { did, message } = body
      const connections = await this.cloudagent.getConnections()
      let connectionId: string | null = null

      for (const { id, theirDid, state } of connections) {
        if (theirDid === did && state == 'completed') {
          connectionId = id
        }
      }
      if (connectionId == null) {
        //create a connection if one does not exist
        await this.cloudagent.receiveImplicitInvitation(did)
      }
      //we need to pool for connection to check if it created?
      if (connectionId == null) {
        throw new Error('Connection not found and failed to create.')
      }
      return this.cloudagent.sendMessage(connectionId, message)
    } catch (e) {
      throw new Error(`${e}`) //Remove this before pushing as we do not want to propagate errors to users
    }
  }

  /**
   * @summary Get all messages.
   * @description Get all open connections and all messages and
   */
  @SuccessResponse(200)
  @Get('/')
  public async get() {
    log.info({ msg: 'Getting all messages', controller: '/messages' })
    const allMessages: Message[] = []
    try {
      const params = { state: DidExchangeState.Completed }
      const connections = await this.cloudagent.getConnections(params)
      for (const { id, theirDid } of connections) {
        const messagesperId = await this.cloudagent.getMessages(id)
        for (const { content, role } of messagesperId) {
          if (role == 'sender') {
            allMessages.push({ content: content, recipientDid: theirDid })
          } else if (role == 'receiver') {
            allMessages.push({ content: content, senderDid: theirDid })
          } else {
            allMessages.push({ content: content, senderDid: 'none found' }) //this ok?
          }
        }
      }
      return allMessages
    } catch (e) {
      log.info({ msg: `${e}`, controller: '/messages' })
      throw new Error(`There has been an issue when getting messages: ${e}`) //Remove this before pushing
    }
  }
}
