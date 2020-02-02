import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'

const link = createHttpLink({
  uri: 'http://localhost:4004/graphql',
  fetch: fetch
})

const cache = new InMemoryCache()

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link,
  cache
})

export const removeTypename = ({ __typename, ...obj }) => obj