import request from 'supertest'
import { getConfig } from '../fixtures/config.js'
import { KeyType } from '@aries-framework/core'

const config = getConfig()

export const importDids = async () => {
  await request(config.alice.veritableUrl)
    .post('/dids/import')
    .send({
      did: config.alice.did,
      privateKeys: [
        {
          keyType: KeyType.Ed25519,
          privateKey: config.alice.privateKey,
        },
      ],
      overwrite: true,
    })
    .set('Accept', 'application/json')
    .expect(200)

  await request(config.bob.veritableUrl)
    .post('/dids/import')
    .send({
      did: config.bob.did,
      privateKeys: [
        {
          keyType: KeyType.Ed25519,
          privateKey: config.bob.privateKey,
        },
      ],
      overwrite: true,
    })
    .set('Accept', 'application/json')
    .expect(200)
}
