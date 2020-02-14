import { Arg, Field, InputType, Mutation, ObjectType, Query, registerEnumType, Resolver } from 'type-graphql'
import { User } from '@/models/User'
import { _Error, ErrorTypes } from 'srb-shared'
import { register, login, getUser } from '@/controllers/auth'

registerEnumType(ErrorTypes, { name: 'ErrorTypes' })

@ObjectType()
class AuthError implements _Error {
  @Field(type => ErrorTypes)
  type: ErrorTypes

  @Field()
  message: string
}

@ObjectType()
export class AuthPayload {
  @Field(type => User, { nullable: true })
  user?: User

  @Field({ nullable: true })
  token?: string

  @Field(type => AuthError, { nullable: true })
  error?: AuthError
}

@InputType()
export class AuthRequest {
  @Field()
  email: string

  @Field({ nullable: true })
  name?: string

  @Field()
  password: string
}

@Resolver()
export class AuthResolvers {
  @Query(returns => AuthPayload)
  async login (
    @Arg('request') request: AuthRequest
  ) {
    return login(request)
  }

  @Query(returns => AuthPayload)
  async user (
    @Arg('token') token: string
  ) {
    return getUser(token)
  }

  @Mutation(returns => AuthPayload)
  async register (
    @Arg('request') request: AuthRequest
  ) {
    return register(request)
  }
}
