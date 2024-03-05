// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Can't extract arg and return types from Prisma
import { container } from 'tsyringe'
import * as sinon from 'sinon'
import { expect } from 'chai'
import { PrismaClient } from '@prisma/client'

import type { Env } from '../../env.js'

import { Database, PrismaWrapper } from '../../lib/db.js'

const mockPrismaClient = new PrismaClient()

class MockPrismaWrapper extends PrismaWrapper {
  constructor(env: Env) {
    super(env)
    this.prismaClient = mockPrismaClient
  }
}

describe('Database', async () => {
  let prismaClient: PrismaClient
  let db: Database
  let findManyStub
  let deleteManyStub
  let createManyStub

  const env = container.resolve<Env>('env')

  const mockKeys = ['abc', 'def', 'ghi']
  const mockConfigRows = [
    { key: 'abc', value: '123' },
    { key: 'def', value: '456' },
    { key: 'ghi', value: '789' },
  ]
  const mockConfigObj = {
    abc: '123',
    def: '456',
    ghi: '789',
  }

  beforeEach(() => {
    container.clearInstances()
    const mockPrismaWrapper = new MockPrismaWrapper(env)
    container.registerInstance(PrismaWrapper, mockPrismaWrapper)
    prismaClient = mockPrismaWrapper.prismaClient
    sinon.stub(prismaClient, '$transaction').resolves()
    db = container.resolve(Database)
    findManyStub = sinon.stub().resolves(mockConfigRows)
    deleteManyStub = sinon.stub().resolves()
    createManyStub = sinon.stub().resolves()
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('getConfig', async () => {
    it('fetch all config rows', async () => {
      sinon.stub(prismaClient, 'config').get(() => {
        return { findMany: findManyStub }
      })

      await db.getConfig()

      sinon.assert.calledOnce(findManyStub)
    })

    it('should return an object with key/value pairs', async () => {
      sinon.stub(prismaClient, 'config').get(() => {
        return {
          findMany: sinon.stub().resolves(mockConfigRows),
        }
      })

      const config = await db.getConfig()

      expect(config).to.deep.equal(mockConfigObj)
    })
  })

  describe('updateConfig', async () => {
    it('should delete rows to be updated', async () => {
      const expectedArg = {
        where: {
          key: {
            in: mockKeys,
          },
        },
      }
      sinon.stub(prismaClient, 'config').get(() => {
        return {
          deleteMany: deleteManyStub,
          createMany: createManyStub,
        }
      })

      await db.updateConfig(mockConfigObj)

      sinon.assert.calledOnceWithExactly(deleteManyStub, expectedArg)
    })

    it('should insert rows to be updated', async () => {
      const expectedArg = { data: mockConfigRows }
      sinon.stub(prismaClient, 'config').get(() => {
        return {
          deleteMany: deleteManyStub,
          createMany: createManyStub,
        }
      })

      await db.updateConfig(mockConfigObj)

      sinon.assert.calledOnceWithExactly(createManyStub, expectedArg)
    })
  })
})
