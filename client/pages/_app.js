import React from 'react'
import NextApp from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import withApolloClient from '../lib/apollo/with-apollo-client';

class App extends NextApp {
  render() {
    const {Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withApolloClient(App);
