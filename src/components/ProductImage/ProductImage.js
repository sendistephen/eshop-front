import { API } from '../../config';
import React from 'react';

const ProductImage = ({ item, url }) => {
  return (
    <div className='relative pb-64'>
      <img
        className='absolute h-full w-full object-contain'
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
      />
    </div>
  );
};

export default ProductImage;
