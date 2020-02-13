import { Field, ID, ObjectType } from 'type-graphql'
import { _BlogPost } from 'srb-shared'
import { prop, Ref } from '@typegoose/typegoose'
import { User } from '@/models/User'

@ObjectType()
export class BlogPost implements _BlogPost {
  @Field(type => ID)
  _id?: string

  @Field()
  @prop({ ref: User })
  author: Ref<User>

  @Field()
  @prop()
  title: string

  @Field()
  @prop()
  body: string
}
