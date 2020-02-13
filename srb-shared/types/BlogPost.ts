import { ID } from './ID'
import { _User, Ref } from './index'

export type _BlogPost = ID & {
  author: Ref<_User>
  title: string
  body: string
}
