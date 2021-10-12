import { useEffect, useState } from 'react';
import 'braintree-web';
import DropIn from 'braintree-web-drop-in-react';
import { isAuthenticated } from 'api/auth';
import { Link } from 'react-router-dom';
import { getBraintreeClientToken, processPayment } from '../../api/braintree';
import { emptyCart } from 'components/Cart/CartHelpers';
import { createOrder } from 'api/order';

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
    loading: false,
  });
  const userId = isAuthenticated() && isAuthenticated().foundUser._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };
  useEffect(() => {
    getToken(userId, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-warning btn-sm'>Sign in to checkout</button>
      </Link>
    );
  };
  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className='form-group mb-3'>
            <label className='text-muted'>Delivery address:</label>
            <textarea
              onChange={handleAddress}
              className='form-control'
              value={data.address}
              placeholder='Type your delivery address here...'
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault',
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className='btn btn-sm btn-danger'>
            Confirm
          </button>
        </div>
      ) : null}
    </div>
  );
  let deliveryAddress = data.address;
  const buy = () => {
    setData({ loading: true });
    // send nonce to the server
    // nonce=data.instance.requestPaymentMethod()

    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        // once we have nonce(cardType, cardNumber etc), send nonce as 'paymentMethodNonce' to backend and the total to be charged
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        processPayment(userId, token, paymentData)
          .then((res) => {
            setData({ ...data, success: res.success });
            // then create order
            const createOrderData = {
              products: products,
              transaction_id: res.transaction_id,
              amount: res.transaction.amount,
              address: deliveryAddress,
            };
            createOrder(userId, token, createOrderData)
              .then((res) => {
                // empty cart
                emptyCart(() => {
                  console.log('Payment complete. Empty cart');
                  setData({ loading: false, success: true });
                });
              })
              .catch((err) => {
                console.log(err);
                setData({ loading: false });
              });
          })
          .catch((err) => {
            console.log(err);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        setData({ ...data, error: error.message });
      });
  };
  const showLoading = (loading) =>
    loading && <p className='lead'>Loading...</p>;
  const showError = (error) => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );
  const showMsg = (success) => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}
    >
      Thanks! Your payment was successfull!
    </div>
  );
  return (
    <div>
      <p className='lead'>Total: ${getTotal()}</p>
      {showLoading(data.loading)}
      {showError(data.error)}
      {showMsg(data.success)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
