import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Layout from '../components/MyLayout';
import Link from 'next/link';

export const TEST_QUERY = gql`
  query getPrimaryShop {
    primaryShop {
      _id
      name
    }
  }
`;

// const ProductLink = props => (
//   <li>
//     <Link href="/p/[id]" as={`/p/${props.id}`}>
//       <a>{props.id}</a>
//     </Link>
//   </li>
// );

export default function Blog() {
  // const { loading, error, data } = useQuery(TEST_QUERY);

  // if (loading) return <p>Loading</p>;
  // if (error) return <p>ERROR</p>;

  //console.log(data);

  return (
      <h1>Querying Data</h1>
  );
}

