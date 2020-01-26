import { buildSchema } from 'type-graphql'
import { AuthResolvers } from './controllers/auth'

export default async () => await buildSchema({
  resolvers: [
    AuthResolvers
  ]
})