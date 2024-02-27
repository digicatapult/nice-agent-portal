import { Controller, Body, Post, Route, SuccessResponse, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { logger } from '../../lib/logger.js'
import { BadRequest } from '../../lib/error-handler/index.js'
import CloudagentManager from '../../lib/services/cloudagent.js'
import Database from '../../lib/db.js'
import type { MemberCreate, ConfirmApplication } from '../types.js'

@Route('api')
@Tags('application')
@injectable()
export class ApplicationController extends Controller {
  constructor(
    private cloudagent: CloudagentManager,
    private db: Database
  ) {
    super()
  }

  /**
   * @summary Submit membership application
   */
  @SuccessResponse(204)
  @Post('/submit-application')
  public async submitApplication(@Body() member: MemberCreate) {
    logger.info({
      msg: 'new request received',
      controller: '/submit-application',
      payload: member,
    })

    await this.db.addMember(member)
  }

  /**
   * @summary Confirm membership with received verification code
   */
  @SuccessResponse(204)
  @Post('/confirm-application')
  public async confirmApplication(@Body() body: ConfirmApplication) {
    logger.info({
      msg: 'new request received',
      controller: '/confirm-application',
      payload: body,
    })

    const decoded = Buffer.from(body.verificationCode, 'base64').toString(
      'utf-8'
    )
    const [id, verificationCode] = decoded.split('.', 2)
    if (!id || !verificationCode) {
      throw new BadRequest('Invalid verification code')
    }

    const member = await this.db.getMember({
      id: parseInt(id),
      verificationCode,
    })

    if (!member) {
      throw new BadRequest('Invalid verification code')
    }

    if (member.status !== 'approved') {
      throw new BadRequest(`Member is not approved (${member.status})`)
    }

    await this.cloudagent.receiveImplicitInvitation(member!.did)
  }
}
