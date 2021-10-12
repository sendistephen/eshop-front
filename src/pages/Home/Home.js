import { fetchAllProducts } from 'api/product';
import { Layout, Product, Search } from 'components';
import React, { useState, useEffect } from 'react';

function Home() {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    fetchAllProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };
  const loadProductsByArrival = () => {
    fetchAllProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };
  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      className='container'
      title='Home Page'
      description='Shoppers online Ecommerce'
    >
      <Search />
      <h3 className='mb-4'>Best Sellers</h3>
      <div className='row'>
        {productsBySell.map((product, index) => (
          <div className='col-md-4 mb-3' key={index}>
            <Product product={product} />
          </div>
        ))}
      </div>

      <h3 className='mb-4'>New Arrivals</h3>
      <div className='row'>
        {productsByArrival.map((product, index) => (
          <div className='col-md-4 mb-3' key={index}>
            <Product key={index} product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Home;
