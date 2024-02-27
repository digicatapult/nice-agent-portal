import { singleton } from 'tsyringe'

import env from '../../env.js'
import { ServiceUnavailable } from '../error-handler/index.js'

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

    if (!res.ok) {
      throw new ServiceUnavailable('Error fetching cloud agent')
    }

    const agentInfo = await res.json()
    return agentInfo as AgentInfo
  }

  receiveImplicitInvitation = async (did: string) => {
    const requestBody = {
      did,
      handshakeProtocols: ['https://didcomm.org/connections/1.0'],
      autoAcceptConnection: true,
    }

    const res = await fetch(`${URL_PREFIX}/oob/receive-implicit-invitation`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      method: 'POST',
    })

    if (!res.ok) {
      throw new ServiceUnavailable('Error accepting implicit invitation')
    }
  }
}
