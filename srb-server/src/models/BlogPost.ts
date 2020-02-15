import { Field, ID, ObjectType } from 'type-graphql'
import { _BlogPost, DateObject, DateRange } from 'srb-shared'
import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { User } from '@/models/User'
import { ObjectId } from '@/utils/types'

@ObjectType()
export class BlogPost implements _BlogPost {
  @Field(type => ID)
  _id?: ObjectId

  @Field(type => User)
  @prop({ ref: User })
  author: Ref<User>

  @Field()
  @prop()
  title: string

  @Field()
  @prop()
  body: string
}

export const BlogPostModel = getModelForClass(BlogPost, {
  schemaOptions: {
    timestamps: true,
    collection: 'posts'
  }
})

export type BlogPostSearch = {
  stringSearch?: string
  dateSearch?: DateRange<DateObject>
  author?: ObjectId
}
