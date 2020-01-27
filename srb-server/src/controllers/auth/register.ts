import { AuthPayload, AuthRequest } from '@/api/auth'
import { UserModel } from '@/models/User'
import { ErrorTypes } from 'srb-shared'
import { errorResponse, ErrorsInput } from '@/controllers/utils'
import { createUserResponse, hashPassword } from '@/controllers/auth/utils'

export const register = async (request: AuthRequest): Promise<AuthPayload> => {

  const hasAllFields: boolean = !!(request.email && request.password)

  const isUserExists: boolean = !!(await UserModel.findOne({ email: request.email }).exec())

  return hasAllFields && !isUserExists
    ? await createNewUser(request)
    : errorOnRegister({ hasAllFields, isUserExists })
}


export const createNewUser = async ({
  name,
  email,
  password: rawPassword
}: AuthRequest): Promise<AuthPayload> => {

  const password = await hashPassword(rawPassword)

  const user = new UserModel({ name, email, password })

  await user.save()

  return createUserResponse(user)
}


export const errorOnRegister = ({
  hasAllFields,
  isUserExists
}: ErrorsInput): AuthPayload => {

  const type = ErrorTypes.REGISTER_FAILED

  const message = !hasAllFields
    ? 'Fill all fields'
    : isUserExists
      ? 'User already exists'
      : 'Unknown error'

  return errorResponse(type, message)
}