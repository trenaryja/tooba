import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { Card } from './schema/generated'

const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3000/graphql',
    }),
  })
})

export const useQuery = async () => {
  const client = getClient()
  return await client.query<{ card: Card }>({
    query: gql`
      query {
        card {
          definition
        }
      }
    `,
  })
}
