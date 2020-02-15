import { BlogPostInput } from '@/api/posts'
import { BlogPostModel } from '@/models/BlogPost'

export const savePost = async (post: BlogPostInput) => {
  const newPost = new BlogPostModel(post)

  return newPost.save()
}
