import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from 'type-graphql'
import { BlogPost, BlogPostSearch } from '@/models/BlogPost'
import { DateRangeClass } from '@/utils/sharedResolvers'
import { _BlogPost, DateObject, DateRange } from 'srb-shared'
import { ObjectId } from '@/utils/types'
import { getPost, getPosts, savePost } from '@/controllers/posts'

@InputType()
export class BlogPostsSearchClass implements BlogPostSearch {
  @Field({ nullable: true })
  stringSearch: string

  @Field(returns => DateRangeClass, { nullable: true })
  dateSearch: DateRange<DateObject>

  @Field(returns => ID, { nullable: true })
  author: ObjectId
}

@InputType()
export class BlogPostInput implements _BlogPost {
  @Field(returns => ID)
  author: ObjectId

  @Field()
  title: string

  @Field()
  body: string
}

@Resolver()
export class BlogPostsResolvers {
  @Query(returns => [BlogPost])
  async posts (
    @Arg('search') search: BlogPostsSearchClass
  ) {
    return getPosts(search)
  }

  @Query(returns => BlogPost)
  async post (
    @Arg('_id') _id: string
  ) {
    return getPost(_id)
  }

  @Mutation(returns => BlogPost)
  async savePost (
    @Arg('post') post: BlogPostInput
  ) {
    return savePost(post)
  }
}
