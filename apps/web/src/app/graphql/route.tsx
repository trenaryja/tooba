import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'

type Resolvers = {
  Query: Query
}

type Query = {
  hello: () => string
  getCard: () => Card
}

type Card = {
  word: string
  definition: string
  buzzWords: string[]
}

const resolvers: Resolvers = {
  Query: {
    hello: () => 'world',
    getCard: () => ({
      word: 'hello',
      definition: 'world',
      buzzWords: ['fizz', 'buzz', 'fizzbuzz'],
    }),
  },
}

const typeDefs = `#graphql
  type Query {
    hello: String
    getCard: Card
  }

  type Card {
    word: String
    definition: String
    buzzWords: [String]
  }

`

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
