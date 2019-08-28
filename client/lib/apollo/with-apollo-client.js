import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import initApollo from './init-apollo';
import Head from 'next/head';

export default App => {
  return class Apollo extends React.Component {
    static displayName = `WithApolloClient(App)`;
    static async getInitialProps (ctx) {
      const { AppTree } = ctx;

      // TODO:
      // - pass prop data to url 
      // - check if getInitialProps was called without a requrest object
      // - parse user object


      //ctx.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      // TODO: don't render if the response is finished while redirecting

      // const apolloState = {};

      // if (!process.browser) {
      //   // Run all GraphQL queries
      //   await getDataFromTree((
      //     <ApolloProvider client={apollo}>
      //       <WrappedComponent {...appProps} Component={Component} router={router} />
      //     </ApolloProvider>
      //   ));

      const apollo = initApollo();
      if (typeof window === 'undefined') {
        try {
          await getDataFromTree(<AppTree {...appProps} apolloClient={apollo} />);
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head sideeffect therefore need to be cleared manually
        Head.rewind();
      }

      //Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    // static propTypes = {
    //   apolloState: PropTypes.object.isRequired
    // };

    // TODO: getDerivedStateFromProps(nextProps)
    // - update routing store and rewrite routing path

    constructor(props) {
      super(props);
      // `getDataFromTree` renders the component first, then the client is passed off as a property.
      // After that, render is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App apolloClient={this.apolloClient} {...this.props} />
    }
  }
}

