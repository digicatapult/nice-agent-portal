import { singleton } from 'tsyringe'

import env from '../../env.js'
import { HttpResponse } from '../error-handler/index.js'
import type { MemberCreate, VerificationCode } from '../../controllers/types.js'

const URL_PREFIX = `http://${env.ISSUER_HOST}:${env.ISSUER_PORT}/api`

@singleton()
export default class IssuerManager {
  constructor() {}

  submitApplication = async (body: MemberCreate) => {
    const res = await fetch(`${URL_PREFIX}/submit-application`, {
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
    const res = await fetch(`${URL_PREFIX}/confirm-application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new HttpResponse({
        message: `Error confirmation application to issuer agent. ${res.status} - ${await res.text()}`,
      })
    }
  }
}
