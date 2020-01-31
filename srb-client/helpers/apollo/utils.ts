import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'

const link = new HttpLink({
  uri: 'http://localhost:4000/'
})

const cache = new InMemoryCache()

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link,
  cache
})