import {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from 'express'
import { ValidateError } from 'tsoa'

import { logger } from '../logger.js'
const log = logger.child({ context: 'ErrorHandler' })

interface INotFound {
  message?: string
  item: string
  name: string
}

interface IBadRequest {
  message?: string
  name: string
}

interface IServiceUnavailable {
  message?: string
  name: string
}

interface IInternalError {
  message?: string
  name: string
}

export class HttpResponse extends Error {
  public code: number
  public message: string
  public details: string

  constructor({ code = 500, message = 'Internal server error', details = '' }) {
    super(message)
    this.code = code
    this.message = message
    this.details = details
  }
}

export class NotFound extends HttpResponse implements INotFound {
  public item: string

  constructor(item: string) {
    super({ code: 404, message: `${item} not found` })
    this.item = item
    this.name = 'not found'
  }
}

export class BadRequest extends HttpResponse implements IBadRequest {
  constructor(message = 'bad request') {
    super({ code: 400, message })
  }
}

export class ServiceUnavailable
  extends HttpResponse
  implements IServiceUnavailable
{
  constructor(message = 'service unavailable', details = '') {
    super({ code: 503, message, details })
  }
}

export class InternalError extends HttpResponse implements IInternalError {
  constructor(message = 'internal server error', details = '') {
    super({ code: 500, message, details })
  }
}

export const errorHandler = function errorHandler(
  err: Error & { code: number; data?: object },
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    log.warn(
      `Handled Validation Error for ${req.path}: %s`,
      JSON.stringify(err.fields)
    )

    const { status, ...rest } = err

    return res.status(422).send({
      ...rest,
      message: 'Validation failed',
    })
  }
  if (err instanceof HttpResponse) {
    log.warn('Error thrown in handler: %s', err.message)
    log.info(err.details)
    log.debug(err.stack)

    return res.status(err.code).json(err.message)
  }
  if (err instanceof Error) {
    log.error('Unexpected error thrown in handler: %s', err.stack)

    return res.status(500).json(err)
  }

  next()
}
