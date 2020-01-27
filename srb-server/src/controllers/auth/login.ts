import { AuthPayload, AuthRequest } from '@/api/auth'
import { errorResponse, ErrorsInput } from '@/controllers/utils'
import { User, UserModel } from '@/models/User'
import { createUserResponse, verifyPassword } from '@/controllers/auth/utils'
import { ErrorTypes } from 'srb-shared'

export const login = async (request: AuthRequest): Promise<AuthPayload> => {

  const hasAllFields: boolean = !!(request.email && request.password)

  const user: User = hasAllFields
    ? await UserModel.findOne({ email: request.email }).exec()
    : null

  const validCredentials: boolean = user
    ? await verifyPassword(user, request.password)
    : false

  return hasAllFields && validCredentials
    ? await createUserResponse(user)
    : errorOnLogin({ hasAllFields, validCredentials })
}


export const errorOnLogin = ({
  hasAllFields,
  validCredentials
}: ErrorsInput): AuthPayload => {

  const type = ErrorTypes.LOGIN_FAILED

  const message = !hasAllFields
    ? 'Fill all fields'
    : !validCredentials
      ? 'Invalid credentials'
      : 'Unknown error'

  return errorResponse(type, message)
}