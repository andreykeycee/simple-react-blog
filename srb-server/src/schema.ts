import { buildSchema } from 'type-graphql'
import { AuthResolvers } from './api/auth'

export default async () => await buildSchema({
  validate: false,
  resolvers: [
    AuthResolvers
  ]
})