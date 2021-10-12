import { API } from 'config';
import React from 'react';

const ProductImage = ({ item, url }) => {
  return (
    <div className='product-img'>
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className='mb-3 card-img-top'
      />
    </div>
  );
};

export default ProductImage;
