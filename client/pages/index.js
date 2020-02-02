import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/with-apollo';

const QUERY = gql`
  query ProductList() {
    inventory {
      id
    }
  }
`;

const Index = () => {
  const { loading, data } = useQuery(QUERY);

  if (loading || !data) {
    return <h1>Loading...</h1>
  }
  return <h1>{data}</h1>
};

export default withApollo(Index);