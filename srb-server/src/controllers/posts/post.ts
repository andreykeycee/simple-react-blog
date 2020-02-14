import { ObjectId } from '@/utils/types'
import { BlogPostModel } from '@/models/BlogPost'

export const getPost = async (_id: ObjectId) => {
  return BlogPostModel.findById(_id)
}
