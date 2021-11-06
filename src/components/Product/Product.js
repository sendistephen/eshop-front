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
          className='bg-yellow-400 text-black px-3 rounded-sm'
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
      <span className='inline-block tracking-wide uppercase text-xs font-semibold bg-green-800 text-green-100 rounded-full px-2'>
        In Stock
      </span>
    ) : (
      <span className='inline-block tracking-wide uppercase text-xs font-semibold bg-red-800 text-red-100 rounded-full px-2'>
        Out of Stock
      </span>
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
    <div className='bg-white border rounded-lg overflow-hidden'>
      {shouldRedirect(redirect)}
      <ProductImage item={product} url='product' />

      <div className='p-6'>
        <h4 className='font-semibold text-lg leading-tight text-gray-900 truncate'>
          {product.name}
        </h4>
        <p className='text-gray-600 leading-tight mt-1 text-sm'>
          {product.description.substring(0, 80)}
        </p>
        <span className='font-bold text-xl mt-1'>${product.price}</span>
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
