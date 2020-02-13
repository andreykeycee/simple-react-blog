import { buildSchema } from 'type-graphql'
import { AuthResolvers } from './api/auth'
import { GraphQLJSON } from 'graphql-type-json'
import * as path from "path"

export default async () => await buildSchema({
  validate: false,
  resolvers: [
    AuthResolvers
  ],
  scalarsMap: [{ type: GraphQLJSON, scalar: GraphQLJSON }],
  emitSchemaFile: path.resolve(__dirname, '../srb-client/schema.graphql')
})
