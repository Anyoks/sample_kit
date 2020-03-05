import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { logout } from '../services/auth';
import { navigate } from 'gatsby';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${process.env.GATSBY_API_URL}`,
  request: async operation => {
    operation.setContext({
      headers: {
        Authorization: `${window.customer_id},${process.env.KIT_UUID}`,
      },
      fetchOptions: {
        credentials: 'include',
      },
    });
  },
  fetch,
  onError: error => {
    if (error.networkError) {
      if (error.networkError.statusCode === 401) {
        logout(() => {
          navigate(`/account`);
        });
      }
    }
  },
});
