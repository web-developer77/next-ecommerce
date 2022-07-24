import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from '@apollo/client'
import { createUploadLink } from "apollo-upload-client";
const { NEXT_PUBLIC_GRAPHQL_URL } = process.env

export const httpLink = createUploadLink({ uri: NEXT_PUBLIC_GRAPHQL_URL });
// new HttpLink({ uri: NEXT_PUBLIC_GRAPHQL_URL })

const authMiddleware = (token?: string) =>
  new ApolloLink((operation, forward) => {
    const bearer = (token && token.includes('Basic')) === true ? '' : 'bearer';
    const bearerToken =
      token === 'empty'
        ? ''
        : token
          ? `${bearer} ${token}`
          : typeof localStorage !== "undefined"
            ? `${bearer} ${localStorage.getItem('token') || ''}`
            : ''
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: bearerToken,
      },
    }))

    return forward(operation)
  })

export const apolloClient = (token?: string) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware(token), httpLink),
  })
