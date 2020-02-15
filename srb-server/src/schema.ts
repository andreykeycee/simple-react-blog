import { buildSchema } from 'type-graphql'
import { AuthResolvers } from './api/auth'
import { BlogPostsResolvers } from '@/api/posts'
import { GraphQLJSON } from 'graphql-type-json'
import path from 'path'

export default async () => await buildSchema({
  validate: false,
  resolvers: [
    AuthResolvers,
    BlogPostsResolvers
  ],
  scalarsMap: [{ type: GraphQLJSON, scalar: GraphQLJSON }],
  emitSchemaFile: path.resolve(__dirname, '../srb-client/schema.graphql')
})
