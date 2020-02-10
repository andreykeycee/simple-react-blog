import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'srb-shared'
import { User } from '@/models/User'
import { AuthPayload } from '@/api/auth'
import { pick } from 'lodash'


export const hashPassword = async (password: string): Promise<string> => {
  const rounds = 10

  return bcrypt.hash(password, rounds)
}


export const verifyPassword = (
  { password }: User,
  passwordInput: string
): Promise<boolean> => {

  return bcrypt.compare(passwordInput, password)
}


export const createToken = async ({ _id }: { _id: ObjectId }): Promise<string> => {

  return jwt.sign({ _id }, 'jwt')
}


export const verifyToken = async (token: string): Promise<{ _id: ObjectId }> => {

  return jwt.verify(token, 'jwt')
}


export const createUserResponse = async (user: User): Promise<AuthPayload> => ({
  user: pick(user, 'email', 'name'),
  token: await createToken({ _id: user._id })
})
