import { Arg, Field, InputType, Mutation, Query, registerEnumType, Resolver } from 'type-graphql'
import { BlogPost, BlogPostSearch, SearchField } from '@/models/BlogPost'
import { DateRangeClass } from '@/utils/sharedResolvers'
import { DateObject, DateRange } from 'srb-shared'
import { ObjectId } from '@/utils/types'
import { getPost, getPosts } from '@/controllers/posts'

registerEnumType(SearchField, { name: 'SearchField' })

@InputType()
export class BlogPostsSearchClass implements BlogPostSearch {
  @Field({ nullable: true })
  stringSearch: string

  @Field(returns => DateRangeClass, { nullable: true })
  dateSearch: DateRange<DateObject>

  @Field({ nullable: true })
  author: ObjectId

  @Field(returns => [SearchField], { nullable: true })
  searchFields: SearchField[]
}

@Resolver()
export class BlogPostsResolvers {
  @Query(returns => [BlogPost])
  async posts (
    @Arg('search') search: BlogPostsSearchClass
  ) {
    return getPosts(search)
  }

  @Query(returns => BlogPost, { nullable: true })
  async post (
    @Arg('_id') _id: ObjectId
  ) {
    return getPost(_id)
  }

  @Mutation(returns => BlogPost)
  async savePost (
    @Arg('post') post: BlogPost
  ) {
    return savePost(post)
  }
}
