import { Controller, Get, Route, SuccessResponse, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { logger } from '../../lib/logger.js'
import CloudagentManager from '../../lib/services/cloudagent.js'
import { ServiceUnavailable } from '../../lib/error-handler/index.js'

const packageVersion = process.env.npm_package_version
  ? process.env.npm_package_version
  : 'unknown'

@Route('api/health')
@Tags('health')
@injectable()
export class HealthController extends Controller {
  constructor(private cloudagent: CloudagentManager) {
    super()
  }

  /**
   * @summary Check health of API and its dependencies
   */
  @SuccessResponse(200)
  @Get('/')
  public async get() {
    logger.debug({ msg: 'new request received', controller: '/health' })

    try {
      return {
        status: 'ok',
        version: packageVersion,
        cloudagentIsInitialized: (await this.cloudagent.getAgent())
          .isInitialized,
      }
    } catch (e) {
      throw new ServiceUnavailable('veritable-cloudagent unavailable')
    }
  }
}
