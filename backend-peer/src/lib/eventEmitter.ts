import EventEmitter from 'events'
import { singleton } from 'tsyringe'

@singleton()
export class NiceEventEmitter extends EventEmitter {
  constructor() {
    super()
  }
}
export namespace NiceEventEmitter {
  export enum EventType {
    BasicMessage = 'basicMessage',
    Connection = 'connection',
    Credential = 'credential',
    Proof = 'proof',
  }
}
