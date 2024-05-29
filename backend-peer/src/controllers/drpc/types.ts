export interface DrpcRequestObject {
  jsonrpc: string
  method: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any[] | object
  id: string | number | null
}

export interface DrpcResponseObject {
  jsonrpc: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result?: any
  error?: DrpcResponseError
  id: string | number | null
}
export interface DrpcResponseError {
  code: DrpcErrorCode
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}
export enum DrpcErrorCode {
  METHOD_NOT_FOUND = -32601,
  PARSE_ERROR = -32700,
  INVALID_REQUEST = -32600,
  INVALID_PARAMS = -32602,
  INTERNAL_ERROR = -32603,
  SERVER_ERROR = -32000,
}

export interface DrpcEvent {
  createdAt: Date
  request?: DrpcRequestObject | DrpcRequestObject[]
  response?: DrpcResponseObject[]
  connectionId: string
  role: DrpcRole
  state: DrpcState
  threadId: string
  id: string
  _tags: object
}
export enum DrpcRole {
  Client = 'client',
  Server = 'server',
}

export enum DrpcState {
  RequestSent = 'request-sent',
  RequestReceived = 'request-received',
  Completed = 'completed',
}
