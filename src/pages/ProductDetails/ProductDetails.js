/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { read, listRelated } from '../../api/product';
import { Product, ProductImage } from '../../components';

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const fetchSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // then fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const { productId } = props.match.params;
    fetchSingleProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <>
      <div className='px-8 mt-12'>
        <Product
          product={product}
          url='product'
          showViewProductButton={false}
        />
      </div>
      <div className='mt-12 px-8'>
        <h1 className='text-2xl font-bold mb-8 text-center'>
          Related Products
        </h1>
        <div className='mb-3 grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4'>
          {relatedProduct.map((product, i) => (
            <Product key={i} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
