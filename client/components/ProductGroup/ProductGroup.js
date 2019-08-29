import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ProductGroupItem from './ProductGroupItem';

export const GET_CATALOG_ITEMS = gql`
  query GetCatalogItems($shopId: ID!, $first: ConnectionLimitInt, $last: ConnectionLimitInt, 
                        $before: ConnectionCursor, $after: ConnectionCursor, $sortBy: CatalogItemSortByField, 
                        $sortByPriceCurrencyCode: String, $sortOrder: SortOrder) {
      catalogItems(shopIds: [$shopId], first: $first, last: $last, before: $before,
                   after: $after, sortBy: $sortBy, sortByPriceCurrencyCode: $sortByPriceCurrencyCode, 
                   sortOrder: $sortOrder) {
      totalCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          _id
          ... on CatalogItemProduct {
            product {
              _id
              title
              slug
              description
              vendor
              pricing {
                compareAtPrice {
                  displayAmount
                }
                displayPrice
              }
              primaryImage {
                URLs {
                  small
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getCatalogItemsVars = {
  shopId: 'cmVhY3Rpb24vc2hvcDpKOEJocTN1VHRkZ3daeDNyeg==',
  sortBy: 'createdAt',
  sortOrder: 'desc'
};

function ProductGroup () {
  const { loading, error, data } = useQuery(
    GET_CATALOG_ITEMS, 
    { variables: getCatalogItemsVars }
  );

  if (error) return <p>ERROR: {error.message}</p>
  if (loading) return <p>Loading CatalogItems...</p>

  const { edges } = data.catalogItems;
  return (
    <div>
      <h2>Product Group</h2>
      <Fragment>
        {edges.map((edge, i) => (
          <ProductGroupItem node={edge.node} key={i}/>
        ))}
      </Fragment>
    </div>
  );
}

export default ProductGroup;