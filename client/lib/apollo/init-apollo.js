import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

function create (initialState) {

  const isBrowser = typeof window !== 'undefined';
  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql-beta',
    credentials: 'same-origin',
    fetch: !isBrowser && fetch
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: httpLink,
    cache: new InMemoryCache().restore(initialState || {})
  });
}

/**
 * @name initApollo
 * @param {Object} initialState Initial state to initialize the Apollo client with
 * @return {ApolloClient} Apollo client instance
 */
export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (typeof window === 'undefined') {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient;
} 