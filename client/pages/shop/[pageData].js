import React from 'react';
import ProductGroup from '../../components/ProductGroup';
import { withApolloClient } from '../../lib/with-apollo-client';

function Shop () {
  return (
    <div>
      <h1>Shop</h1>
      <ProductGroup />
    </div>
  );
}

export default withApolloClient(Shop);