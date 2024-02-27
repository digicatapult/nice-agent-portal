import { Controller, Post, Route, SuccessResponse, Tags, Body } from 'tsoa'
import { injectable } from 'tsyringe'

import { logger } from '../../lib/logger.js'
import type { VerificationCode } from '../types.js'

import IssuerManager from '../../lib/services/issuer.js'

@Route('api/confirmation')
@Tags('confirmation')
@injectable()
export class ConfirmationController extends Controller {
  constructor(private issuer: IssuerManager) {
    super()
  }

  /**
   * @summary Confirm an application
   */
  @SuccessResponse(204)
  @Post('/')
  public async post(@Body() body: VerificationCode) {
    logger.debug({
      msg: 'new request received',
      controller: '/confirmation',
      payload: body,
    })

    await this.issuer.confirmApplication(body)
  }
}
