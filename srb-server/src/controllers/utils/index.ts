import { _Error, errorConstructor, ErrorTypes } from 'srb-shared'

export const errorResponse = (type: ErrorTypes, message: string): ErrorResponse => ({
  error: errorConstructor(type, message)
})

type ErrorResponse = {
  error: _Error
}

export type ErrorsInput = {
  [errorName: string]: boolean
}