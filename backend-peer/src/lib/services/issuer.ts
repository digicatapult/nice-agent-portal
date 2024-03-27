import { singleton, container } from 'tsyringe'

import type { Env } from '../../env.js'
import { BadRequest, HttpResponse } from '../error-handler/index.js'
import type { MemberCreate, VerificationCode } from '../../controllers/types.js'

@singleton()
export class IssuerManager {
  private url_prefix: string

  constructor() {
    const env = container.resolve<Env>('env')
    this.url_prefix = `http://${env.ISSUER_HOST}:${env.ISSUER_PORT}/api`
  }

  submitApplication = async (body: MemberCreate) => {
    const res = await fetch(`${this.url_prefix}/submit-application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      throw new HttpResponse({
        message: `Error submitting application to issuer agent. ${res.status} - ${await res.text()}`,
      })
    }
  }

  confirmApplication = async (body: VerificationCode) => {
    const res = await fetch(`${this.url_prefix}/confirm-application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (res.status === 400) {
      throw new BadRequest((await res.json()) as string)
    }

    if (!res.ok) {
      throw new HttpResponse({
        message: `Error confirmation application to issuer agent. ${res.status} - ${await res.text()}`,
      })
    }
  }
}
