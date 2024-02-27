import { singleton } from 'tsyringe'
import { PrismaClient } from '@prisma/client'

import env from '../env.js'

@singleton()
export default class Database {
  private db: PrismaClient

  constructor() {
    this.db = new PrismaClient({
      datasourceUrl: `postgresql://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
    })
  }

  // example query
  getMembers = async () => {
    return this.db.member.findMany()
  }
}
