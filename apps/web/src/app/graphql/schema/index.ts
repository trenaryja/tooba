import { DocumentNode, gql } from '@apollo/client'
import { faker } from '@faker-js/faker'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { Resolvers } from './generated'

type OperationType = 'GET' | 'POST' | 'PUT' | 'DELETE'

type GraphType = 'CARD'

export type QueryOption = `${OperationType}_${GraphType}`

export const Queries: Record<QueryOption, DocumentNode> = {
  GET_CARD: gql`
    query {
      card {
        word
        definition
        buzzWords
      }
    }
  `,
  POST_CARD: undefined,
  PUT_CARD: undefined,
  DELETE_CARD: undefined,
}

const typesArray = loadFilesSync('**/*.graphql')
export const typeDefs = mergeTypeDefs(typesArray)

export const resolvers: Resolvers = {
  Query: {
    hello: () => 'world',
    card: () => {
      console.log('card resolver')
      return {
        word: faker.animal.type(),
        definition: faker.lorem.words(5),
        buzzWords: faker.lorem.words(5).split(' '),
      }
    },
  },
}
