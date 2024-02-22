import { singleton } from 'tsyringe'
import { PrismaClient } from '@prisma/client'

//import env from '../env.js'

@singleton()
export default class Database {
  private db: PrismaClient

  constructor() {
    this.db = new PrismaClient()
  }

  getMembers = async () => {
    return this.db.member.findMany()
  }
}
