import ProductImage from 'components/ProductImage';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import {
  addProductToCart,
  updateItem,
  removeItem,
} from 'components/Cart/CartHelpers';

const Product = ({
  product,
  cartUpdate = false,
  showViewProductButton = true,
  showAddToCartButton = true,
  showRemoveProductButton = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/products/${product._id}`}>
          <button className='btn btn-success btn-sm  mt-2 mb-2'>
            View Details
          </button>
        </Link>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => removeItem(product._id)}
          className='btn btn-danger btn-sm  mt-2 mb-2'
        >
          Remove Product
        </button>
      )
    );
  };
  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className='btn btn-sm btn-dark mt-2 mb-2 mr-2'
        >
          Add to cart{' '}
        </button>
      )
    );
  };
  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };
  const showCardUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust quantity</span>
            </div>
            <input
              value={count}
              onChange={handleChange(product._id)}
              type='number'
              className='form-control'
              name=''
            />
          </div>
        </div>
      )
    );
  };
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-success badge-pill'>In Stock</span>
    ) : (
      <span className='badge badge-danger badge-pill'>Out of Stock</span>
    );
  };
  const addToCart = () => {
    addProductToCart(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = () => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  return (
    <div className='card'>
      <div className='card-header name'>{product.name}</div>
      <div className='card-body'>
        {shouldRedirect(redirect)}
        <ProductImage item={product} url='product' />
        <p className='card-text lead'>{product.description.substring(0, 50)}</p>
        <p className='card-text black-10'>$ {product.price}</p>
        <div className=''>
          <span className='mr-2 block'>Category</span>
          <span className='badge bg-light text-dark'>
            {product.category && product.category.name}
          </span>
        </div>
        <p className='black-8 my-2'>
          Added {moment(product.createdAt).fromNow()}
        </p>
        <div>{showStock(product.quantity)}</div>
        {showAddToCart(showAddToCartButton)}
        {showViewButton(showViewProductButton)}
        {showRemoveButton(showRemoveProductButton)}
        {showCardUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Product;
