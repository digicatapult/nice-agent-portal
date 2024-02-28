import { Controller, Get, Post, Path, Route, SuccessResponse, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { logger } from '../../lib/logger.js'
import { InternalError } from '../../lib/error-handler/index.js'
import Database from '../../lib/db.js'

@Route('api/admin/members')
@Tags('members')
@injectable()
export class MembersController extends Controller {
  constructor(private db: Database) {
    super()
  }

  /**
   * @summary Get all NICE members and applicants
   */
  @SuccessResponse(200)
  @Get('/')
  public async getMembers() {
    logger.info({ msg: 'new request received', controller: '/members' })

    return this.db.getMembers()
  }

  /**
   * @summary Approve NICE applicant
   * @param memberId Member ID
   */
  @SuccessResponse(200)
  @Post('/:memberId/approve')
  public async approveMember(@Path('memberId') id: number) {
    logger.info({
      msg: 'new request received',
      controller: '/members/:memberId/approve',
    })

    let member

    try {
      member = await this.db.updateMember(
        { id, status: 'pending' },
        { status: 'approved' }
      )
    } catch (e) {
      throw new InternalError('Could not approve member')
    }
    const verificationCode = Buffer.from(
      `${member.id}.${member.verificationCode}`
    ).toString('base64')
    return { verificationCode }
  }
}
