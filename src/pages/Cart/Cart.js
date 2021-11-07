import { Checkout, Product } from 'components';
import { getCart } from 'components/Cart/CartHelpers';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItemsFromLs = () => {
    return (
      <div className='w-10/12 grid grid-rows-flow gap-3'>
        <p className='font-normal text-gray-600 my-3'>
          Your cart has {`${items.length}`} item(s)
        </p>
        <hr />
        {items.map((item, index) => (
          <Product
            key={index}
            product={item}
            cartUpdate={true}
            showAddToCartButton={false}
            showRemoveProductButton={true}
          />
        ))}
      </div>
    );
  };
  const notItemsMessage = () => {
    <h4 className='font-normal text-gray-600 my-3'>
      Your cart is empty.{' '}
      <br>
        <Link to='/shop'>Continue shopping</Link>
      </br>
    </h4>;
  };

  return (
    <div className='px-8 mt-12'>
      <h1 className='text-4xl font-bold'>Shopping Cart</h1>
      <div className='flex'>
        <span>{items.length > 0 ? showItemsFromLs() : notItemsMessage()}</span>
        <div className='w-full'>
          <h4 className='mb-3'>Order Summary</h4>
          <hr className='border border-1 border-gray-100'/>
          <Checkout products={items} />
        </div>
      </div>
    </div>
  );
};
export default Cart;
