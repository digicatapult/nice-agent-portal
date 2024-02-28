import { Controller, Post, Route, SuccessResponse, Tags, Body } from 'tsoa'
import { injectable } from 'tsyringe'
import { KeyType } from '@aries-framework/core'

import { logger } from '../../lib/logger.js'
import CloudagentManager from '../../lib/services/cloudagent.js'
import type { MemberCreateWithSecret } from '../types.js'

import IssuerManager from '../../lib/services/issuer.js'
import { HttpResponse } from '../../lib/error-handler/index.js'

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
    logger.debug({
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

    const { didDocument } = await this.cloudagent.importDid(didImport)

    if (!didDocument) {
      throw new HttpResponse({ message: 'Failed to create DID document' })
    }

    await this.issuer.submitApplication({
      ...member,
    })
  }
}
