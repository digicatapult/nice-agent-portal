import EventEmitter from 'events'
import { singleton } from 'tsyringe'
export enum EventType {
  BasicMessage = 'basicMessage',
  Connection = 'connection',
  Credential = 'credential',
  Proof = 'proof',
}
@singleton()
export class NiceEventEmitter extends EventEmitter {
  constructor() {
    super()
  }
}
