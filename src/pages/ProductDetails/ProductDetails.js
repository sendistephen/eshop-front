/* eslint-disable no-unused-vars */
import { read, listRelated } from 'api/product';
import { Layout, Product } from 'components';
import React, { useEffect, useState } from 'react';

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
    <Layout
      title={product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className='container'
    >
      <div className='row'>
        <div className='col-md-8'>
          {product && product.description && (
            <Product product={product} showViewProductButton={false} />
          )}
        </div>
        <div className='col-md-4'>
          <h4>Related products</h4>
          {relatedProduct.map((product, i) => (
            <div className='mb-3'>
              <Product key={i} product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
