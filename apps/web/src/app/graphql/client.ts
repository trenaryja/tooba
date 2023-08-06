import {
  ApolloClient,
  DocumentNode,
  HttpLink,
  InMemoryCache,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { Queries, QueryOption } from './schema'

const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3000/graphql',
      fetchOptions: {
        // caches: 'no-cache',
      },
    }),
  })
})

export const useQuery = async <T>(query: QueryOption | DocumentNode | TypedDocumentNode<T, OperationVariables>) => {
  const client = getClient()
  return await client.query<T>({
    query: typeof query === 'string' ? Queries[query] : query,
  })
}
