import { Query, Resolver } from 'type-graphql'
import { User } from '@/models/User'

@Resolver()
export class AuthResolvers {
  @Query(returns => User)
  async user () {
    
  }
}
