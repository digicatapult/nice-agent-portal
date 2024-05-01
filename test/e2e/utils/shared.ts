import { ConnectionRecord } from '@aries-framework/core'
import request from 'supertest'

export const pollGetConnections = async (
  baseUrl: string,
  stopPollCondition: (connections: ConnectionRecord[]) => boolean,
  delay: number = 1000
) => {
  const poll = async (): Promise<void> => {
    const { body: connections } = await request(baseUrl).get('/connections')
    if (connections.length > 0 && stopPollCondition(connections)) {
      return
    }
    await new Promise((resolve) => setTimeout(resolve, delay))
    await poll()
  }

  await poll()
}
