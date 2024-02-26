import { singleton } from 'tsyringe'

import env from '../../env.js'
import { HttpResponse } from '../error-handler/index.js'
import type {
  SubmitApplication,
  VerificationCode,
} from '../models/application.js'

const URL_PREFIX = `http://${env.ISSUER_HOST}:${env.ISSUER_PORT}`

@singleton()
export default class IssuerManager {
  constructor() {}

  submitApplication = async (
    body: SubmitApplication
  ): Promise<VerificationCode> => {
    const res = await fetch(`${URL_PREFIX}/submit-application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      const verificationCode = await res.json()
      return verificationCode as VerificationCode
    }

    throw new HttpResponse({ message: 'Error fetching issuer agent' })
  }

  confirmApplication = async (body: VerificationCode) => {
    const res = await fetch(`${URL_PREFIX}/submit-application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new HttpResponse({ message: 'Error fetching issuer agent' })
    }
  }
}
