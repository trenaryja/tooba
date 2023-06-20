import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { resolvers, typeDefs } from './schema'

const server = new ApolloServer({
  resolvers,
  typeDefs,
})

const handler = startServerAndCreateNextHandler(server)

export async function GET(request) {
  return handler(request)
}

export async function POST(request) {
  return handler(request)
}
