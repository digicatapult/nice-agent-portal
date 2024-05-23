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
    let connectionId: string | undefined

    const connection = connections.find(({ theirDid, state }) => {
      return theirDid === did && state === 'completed'
    })
    if (connection) {
      connectionId = connection.id
    }

    if (connectionId === undefined) {
      //create a connection if one does not exist
      const connectionRecord = await this.cloudagent.createConnection(did, true)
      if (!connectionRecord) {
        throw new Error('Failed to create connection record.') // Handle the case where connectionRecord is undefined
      }
      connectionId = connectionRecord.id
    }

    const res = await this.cloudagent.sendMessage(connectionId, message)
    return res
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
          allMessages.push({
            content: content,
            senderDid: 'unknown',
            recipientDid: 'unknown',
          })
        }
      }
    }
    return allMessages
  }
}
