import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/with-apollo';
import Link from 'next/link';
import { LANDING_COPY } from '../constants';
import styles from '../styles/landing.scss';

const QUERY = gql`
  query ProductList {
    inventory {
      id
    }
  }
`;

const Index = () => {
  return (
    <div className='landing'>
      <div className={styles.landingBody}>
        <p className={styles.text}>
          <Link href='/'>
            <a>all mankind is stupid</a>
          </Link>
          {LANDING_COPY[0]}
          <Link href='/store'>
            <a>store</a>
          </Link>
          {LANDING_COPY[1]}
          <Link href='/lookbook'>
            <a>lookbook</a>
          </Link>
          {LANDING_COPY[2]}
          <Link href='/extras'>
            <a>extras</a>
          </Link>
          {LANDING_COPY[3]}
        </p>
      </div>
    </div>
  );
};

export default withApollo(Index);