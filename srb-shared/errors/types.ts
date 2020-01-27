export enum ErrorTypes {
  REGISTER_FAILED = 'REGISTER_FAILED',
  LOGIN_FAILED = 'LOGIN_FAILED'
}

export type _Error = {
  type: ErrorTypes
  message: string
}