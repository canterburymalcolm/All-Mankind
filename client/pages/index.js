import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { withApolloClient } from '../lib/with-apollo-client';
import Link from 'next/link';

export const GET_PRIMARY_SHOP= gql` 
  query PrimaryShop {
    primaryShop {
      _id
      name
    }
  }
`;

function IndexPage () {
  const { data, loading, error } = useQuery(GET_PRIMARY_SHOP);
  if (loading)  return <h1>Loading Query...</h1>;
  if (error) return <h1>ERROR: {error.message}</h1>
  const { _id, name } = data.primaryShop;
  return (
    <div>
      <h1>Retrieved Data</h1>
      <p>ID: {_id}</p>
      <p>Name: {name}</p>
      <Link href="/shop/[pageData]" as={`/shop/1`}>
        <a>Shop</a>
      </Link>
    </div>

  )
}

export default withApolloClient(IndexPage);
