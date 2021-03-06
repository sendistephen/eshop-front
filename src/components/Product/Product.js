import ProductImage from '../../components/ProductImage';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  addProductToCart,
  updateItem,
  removeItem,
} from '../../helpers/CartHelpers';

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
          <div className='font-normal text-gray-600 px-3 py-1 rounded-sm  border border-1 border-pink-500 hover:bg-pink-500 hover:text-white '>
            Details
          </div>
        </Link>
      )
    );
  };
  const  showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <div
          onClick={() => removeItem(product._id)}
          className='font-normal text-gray-600 px-3 rounded-sm py-1 border border-1 border-red-400 hover:bg-red-500 hover:text-white '
        >
          Remove Product
        </div>
      )
    );
  };
  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <div
          onClick={addToCart}
          className=' font-normal text-gray-600 px-3 rounded-sm py-1 border border-1 border-yellow-400 hover:bg-yellow-400 hover:text-black'
        >
          Add to cart{' '}
        </div>
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
              className='py-1 px-2 w-16 text-xs rounded'
              name=''
            />
          </div>
        </div>
      )
    );
  };
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <p className='inline-block tracking-wide uppercase text-xs font-semibold bg-green-800 text-green-100 rounded-full px-2'>
        In Stock
      </p>
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
    <div className='overflow-hidden border rounded-lg bg-white shadow'>
      {shouldRedirect(redirect)}
      <ProductImage item={product} url='product' />

      <div className='p-6'>
        <h4 className='font-semibold text-lg leading-tight text-gray-900 truncate'>
          {product.name}
        </h4>
        <p className='text-gray-600 leading-tight mt-1 text-sm truncate'>
          {product.description}
        </p>
        <span className='font-bold text-xl mt-1'>${product.price}</span>
        <div>{showStock(product.quantity)}</div>
        <div className='flex justify-between items-center text-sm mt-2'>
          {showAddToCart(showAddToCartButton)}
          {showViewButton(showViewProductButton)}
          {showRemoveButton(showRemoveProductButton)}
          {showCardUpdateOptions(cartUpdate)}
        </div>
      </div>
    </div>
  );
};

export default Product;
