import { _User } from 'srb-shared'
import { Field, ID, ObjectType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'

@ObjectType()
export class User implements _User {
  @Field(type => ID)
  _id: string

  @Field()
  @prop()
  name: string

  @Field()
  @prop()
  email: string

  @Field()
  @prop()
  password: string
}