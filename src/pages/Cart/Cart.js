import { Checkout, Layout, Product } from 'components';
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
      <div>
        <p className='lead'>Your cart has {`${items.length}`} item(s)</p>
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
    <h4>
      Your cart is empty.{' '}
      <br>
        <Link to='/shop'>Continue shopping</Link>
      </br>
    </h4>;
  };

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items. Add remove checkout or continue shopping.'
      className='container'
    >
      <div className='row'>
        <div className='col-md-6'>
          {items.length > 0 ? showItemsFromLs() : notItemsMessage()}
        </div>
        <div className='col-md-6'>
          <h4 className='mb-3'>Order Summary</h4>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};
export default Cart;
