import { ApolloClient, HttpLink, NormalizedCacheObject, InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

const initCache = (state?: NormalizedCacheObject) => {
  return state || {};
}

function create (state?: NormalizedCacheObject) {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.URL,
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch: fetch,
    }),
    cache: new InMemoryCache().restore(
      initCache(state)
    )
  })
}

export default function initApollo (state?: NormalizedCacheObject) {
    return create(state);
}