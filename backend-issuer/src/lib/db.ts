import { singleton, container } from 'tsyringe'
import { PrismaClient, Prisma } from '@prisma/client'

import type { Env } from '../env.js'

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
    const env = container.resolve<Env>('env')
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

  deleteMember = async (where: Prisma.MemberWhereUniqueInput) => {
    return this.db.member.delete({ where })
  }

  getConfig = async () => {
    return (await this.db.config.findMany()).reduce(
      (acc, configPair) => {
        acc[configPair.key] = configPair.value
        return acc
      },
      {} as { [key: string]: string }
    )
  }

  updateConfig = async (config: { [key: string]: string }) => {
    await this.db.$transaction([
      this.db.config.deleteMany({
        where: { key: { in: Object.keys(config) } },
      }),
      this.db.config.createMany({
        data: Object.entries(config).map(([key, value]) => ({ key, value })),
      }),
    ])
  }
}
