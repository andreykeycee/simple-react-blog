import { AuthPayload } from '@/api/auth'
import { createUserResponse, verifyToken } from '@/controllers/auth/utils'
import { UserModel } from '@/models/User'

export const getUser = async (token: string): Promise<AuthPayload> => {
  const { _id } = await verifyToken(token)
  const user = await UserModel.findById(_id).exec()

  return createUserResponse(user)
}
