import { singleton } from 'tsyringe'

import env from '../../env.js'
import { HttpResponse } from '../error-handler/index.js'

const URL_PREFIX = `http://${env.CLOUDAGENT_HOST}:${env.CLOUDAGENT_PORT}`

interface AgentInfo {
  label: string
  endpoints: string[]
  isInitialized: boolean
}

@singleton()
export default class CloudagentManager {
  constructor() {}

  getAgent = async (): Promise<AgentInfo> => {
    const res = await fetch(`${URL_PREFIX}/agent`)

    if (res.ok) {
      const agentInfo = await res.json()
      return agentInfo as AgentInfo
    }

    throw new HttpResponse({ message: 'Error fetching cloud agent' })
  }
}
