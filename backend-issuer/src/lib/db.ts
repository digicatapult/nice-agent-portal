import { singleton, container, injectable, inject } from 'tsyringe'
import { PrismaClient, Prisma } from '@prisma/client'

import type { Env } from '../env.js'

export type MemberCreate = Pick<
  Prisma.MemberCreateInput,
  'companyName' | 'companiesHouseNumber' | 'email' | 'did'
>
export type MemberConfirm = Required<
  Pick<Prisma.MemberWhereUniqueInput, 'id' | 'verificationCode' | 'status'>
>

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
    // Converts key/value pairs into javascript object
    return (await this.db.config.findMany()).reduce(
      (acc, configPair) => {
        acc[configPair.key] = configPair.value
        return acc
      },
      {} as { [key: string]: string }
    )
  }

  // Upsert handled by deleteMany and createMany atomic transaction
  updateConfig = async (config: { [key: string]: string }) => {
    await this.db.$transaction([
      this.db.config.deleteMany({
        where: { key: { in: Object.keys(config) } },
      }),
      this.db.config.createMany({
        // Converts javascript object in key/value pairs
        data: Object.entries(config).map(([key, value]) => ({ key, value })),
      }),
    ])
  }
}
