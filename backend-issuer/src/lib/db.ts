import { singleton } from 'tsyringe'
import { PrismaClient, Prisma } from '@prisma/client'

import env from '../env.js'

export type MemberCreate = Pick<
  Prisma.MemberCreateInput,
  'companyName' | 'companiesHouseNumber' | 'email' | 'did'
>
export type MemberConfirm = Required<
  Pick<Prisma.MemberWhereUniqueInput, 'id' | 'verificationCode' | 'status'>
>

@singleton()
export default class Database {
  private db: PrismaClient

  constructor() {
    this.db = new PrismaClient({
      datasourceUrl: `postgresql://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
    })
  }

  getMember = async (where: Prisma.MemberWhereUniqueInput) => {
    return this.db.member.findUnique({ where })
  }
  getMembers = async () => {
    return this.db.member.findMany()
  }

  addMember = async (data: Prisma.MemberCreateInput) => {
    return this.db.member.create({ data })
  }

  updateMember = async (
    where: Prisma.MemberWhereUniqueInput,
    data: Prisma.MemberUpdateInput
  ) => {
    return this.db.member.update({ where, data })
  }
}
