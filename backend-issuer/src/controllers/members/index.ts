import {
  Controller,
  Get,
  Post,
  Delete,
  Path,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa'
import { injectable } from 'tsyringe'

import { InternalError } from '../../lib/error-handler/index.js'
import { Database } from '../../lib/db.js'
import { logger } from '../../lib/logger.js'
const log = logger.child({ context: 'MembersController' })

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
    log.info({ msg: 'new request received', controller: '/members' })

    return this.db.getMembers()
  }

  /**
   * @summer Delete a member
   * @param memberId Member ID
   */
  @SuccessResponse(204)
  @Delete('/:memberId')
  public async deleteMember(@Path('memberId') id: number) {
    log.info({
      msg: 'new request received',
      controller: '/members/:memberId',
    })

    try {
      await this.db.deleteMember({ id })
    } catch (e) {
      throw new InternalError('Could not delete member')
    }
  }

  /**
   * @summary Approve NICE applicant
   * @param memberId Member ID
   */
  @SuccessResponse(200)
  @Post('/:memberId/approve')
  public async approveMember(@Path('memberId') id: number) {
    log.info({
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
