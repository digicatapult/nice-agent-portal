import { singleton, container, injectable, inject } from 'tsyringe'
import { PrismaClient } from '@prisma/client'

import type { Env } from '../env.js'

@injectable()
@singleton()
export class PrismaWrapper {
  public prismaClient: PrismaClient

  constructor(@inject('env') private env: Env) {
    this.prismaClient = new PrismaClient({
      datasourceUrl: `postgresql://${this.env.DB_USERNAME}:${this.env.DB_PASSWORD}@${env.DB_HOST}:${this.env.DB_PORT}/${this.env.DB_NAME}`,
    })
  }
}

@singleton()
export class Database {
  private db: PrismaClient

  constructor() {
    this.db = container.resolve(PrismaWrapper).prismaClient
  }

  // example query
  getMembers = async () => {
    return this.db.member.findMany()
  }
}
