import React from 'react';

function ProductGroupItem ({ node }) {
  const { title, description, pricing } = node.product;
  return (
    <div>
      <h3>ProductGroupItem</h3>
      <div>
        <p>Title: {title}</p>
        <p>desc: {description}</p>
        <p>price: {pricing[0].displayPrice}</p>
      </div>
    </div>
  );
}

export default ProductGroupItem;