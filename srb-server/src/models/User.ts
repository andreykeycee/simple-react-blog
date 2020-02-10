import { _User } from 'srb-shared'
import { Field, ID, ObjectType } from 'type-graphql'
import { getModelForClass, prop } from '@typegoose/typegoose'

@ObjectType()
export class User implements _User {
  @Field(type => ID)
  _id?: string

  @Field({ nullable: true })
  @prop()
  name?: string

  @Field()
  @prop()
  email: string

  @prop()
  password?: string
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
    collection: 'users'
  }
})
