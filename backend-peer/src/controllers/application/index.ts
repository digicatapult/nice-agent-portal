import { Controller, Post, Route, SuccessResponse, Tags, Body } from 'tsoa'
import { injectable } from 'tsyringe'
import { KeyType } from '@aries-framework/core'

import { logger } from '../../lib/logger.js'
import CloudagentManager from '../../lib/services/cloudagent.js'
import type { Application, VerificationCode } from '../types.js'

import IssuerManager from '../../lib/services/issuer.js'
import { HttpResponse } from '../../lib/error-handler/index.js'
import env from '../../env.js'

@Route('api/application')
@Tags('health')
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
  public async post(@Body() body: Application) {
    logger.debug({
      msg: 'new request received',
      controller: '/application',
      payload: body,
    })

    const didImport = {
      did: env.WEB_DID,
      privateKeys: [
        {
          keyType: KeyType.Ed25519,
          privateKey: env.WEB_DID_PRIVATE_KEY,
        },
      ],
      overwrite: true,
    }

    const { didDocument } = await this.cloudagent.importDid(didImport)

    if (!didDocument) {
      throw new HttpResponse({ message: 'Failed to create DID document' })
    }

    await this.issuer.submitApplication({
      ...body,
      did: didDocument.id,
    })
  }

  /**
   * @summary Confirm an application
   */
  @SuccessResponse(204)
  @Post('/confirmation')
  public async postConfirmation(@Body() body: VerificationCode) {
    logger.debug({ msg: 'new request received', controller: '/application' })

    await this.issuer.confirmApplication(body)

    return
  }
}
