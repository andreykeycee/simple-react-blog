import { _Error, ErrorTypes } from './types'


export const errorConstructor = (
  type: ErrorTypes,
  message: string
): _Error => ({ type, message })