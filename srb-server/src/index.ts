import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import 'reflect-metadata'
import { connectToDb } from '@/db'
import buildSchema from '@/schema'

const app = express()

connectToDb().then(async () => {
  const schema = await buildSchema()

  const server = new ApolloServer({
    schema,
  })

  server.applyMiddleware({ app, path: '/graphql' })

  app.listen({ port: 4004 }, () => {
    console.log('Apollo Server on http://localhost:4004/graphql')
  })
})

