import { Controller, Post, Route, SuccessResponse, Tags, Body } from 'tsoa'
import { injectable } from 'tsyringe'

import { logger } from '../../lib/logger.js'
import { DrpcRequestObject, DrpcResponseObject } from './types.js'
import { FetchAiAdapterManager } from '../../lib/services/adapter.js'
import axios from 'axios'

const log = logger.child({ context: 'DrpcController' })

@Route('api/drpc')
@Tags('drpc')
@injectable()
export class DrpcController extends Controller {
  constructor(private adapter: FetchAiAdapterManager) {
    super()
  }
  /**
   * @summary Receive query from external platform.
   * @description Receive query from external platform (ex HyYield).
   */
  @SuccessResponse(204)
  @Post('/receive-query')
  public async receiveQuery(@Body() body: { drpcRequest: DrpcRequestObject }) {
    log.debug({
      msg: 'new request received',
      controller: '/drpc',
      payload: body,
    })
    const { drpcRequest } = body
    const res = await this.adapter.sendRequestToAdapter(drpcRequest)

    return res.body
  }
  /**
   * @summary Receive response from external platform.
   * @description Receive response from external platform (ex HyYield).
   */
  @SuccessResponse(204)
  @Post('/receive-response')
  public async receiveResponse(
    @Body() body: { did: string; drpcResponse: DrpcResponseObject }
  ) {
    log.debug({
      msg: 'new request received',
      controller: '/drpc',
      payload: body,
    })
    const { drpcResponse } = body
    console.log(drpcResponse)

    try {
      // Send response to Postman mock server
      const postmanEndpoint =
        'https://4cf5192a-bb86-449b-b1fe-9c816ddd4412.mock.pstmn.io/receive-response' // Replace with actual Postman mock server URL
      const response = await axios.post(postmanEndpoint, drpcResponse)
      log.debug({
        msg: 'Successfully sent response to Postman',
        controller: '/drpc',
        response: response.data,
      })
    } catch (error) {
      log.error({
        msg: 'Failed to send response to Postman',
        controller: '/drpc',
        error: error,
      })
      return error
    }

    return 'success'
  }
}
