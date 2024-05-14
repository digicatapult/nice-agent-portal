import { Controller, Post, Route, SuccessResponse, Tags, Body } from 'tsoa'
import { injectable } from 'tsyringe'
import { KeyType } from '@aries-framework/core'

import { CloudagentManager } from '../../lib/services/cloudagent.js'
import type { MemberCreateWithSecret } from '../types.js'

import { IssuerManager } from '../../lib/services/issuer.js'
import { logger } from '../../lib/logger.js'
const log = logger.child({ context: 'HealthController' })

@Route('api/application')
@Tags('application')
@injectable()
export class ApplicationController extends Controller {
  constructor(
    private cloudagent: CloudagentManager,
    private issuer: IssuerManager
  ) {
    super()
  }

  /**
   * @summary Create a new application
   */
  @SuccessResponse(204)
  @Post('/')
  public async post(@Body() body: MemberCreateWithSecret) {
    log.debug({
      msg: 'new request received',
      controller: '/application',
      payload: body,
    })

    const { privateKey, ...member } = body

    const didImport = {
      did: member.did,
      privateKeys: [
        {
          keyType: KeyType.Ed25519,
          privateKey,
        },
      ],
      overwrite: true,
    }

    await this.cloudagent.importDid(didImport)

    await this.issuer.submitApplication({
      ...member,
    })
  }
}
