import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { Resolvers } from './generated'

const typesArray = loadFilesSync('**/*.graphql')
export const typeDefs = mergeTypeDefs(typesArray)

export const resolvers: Resolvers = {
  Query: {
    hello: () => 'world',
    card: () => ({
      word: 'hello',
      definition: 'world',
      buzzWords: ['fizz', 'buzz', 'fizzbuzz'],
    }),
  },
}
