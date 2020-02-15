import { BlogPost, BlogPostModel } from '@/models/BlogPost'

export const getPost = async (_id: string): Promise<BlogPost> => {
  return BlogPostModel.findById(_id).exec()
}
