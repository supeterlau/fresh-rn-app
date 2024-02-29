import {ApolloClient, InMemoryCache} from '@apollo/client'

const appUri = 'https://swapi-graphql.netlify.app/.netlify/functions/index'

export const client = new ApolloClient({
  uri: appUri,
  cache: new InMemoryCache()
})