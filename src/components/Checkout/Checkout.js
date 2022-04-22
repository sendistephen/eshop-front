import React from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'braintree-web';
import DropIn from 'braintree-web-drop-in-react';
import { isAuthenticated } from '../../api/auth';
import { getBraintreeClientToken, processPayment } from '../../api/braintree';
import { emptyCart } from '../../helpers/CartHelpers';
import { createOrder } from '../../api/order';

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
        <button className='mt-4 bg-purple-500 py-2 px-2 text-purple-100 hover:bg-purple-600 rounded'>
          Sign in to checkout
        </button>
      </Link>
    );
  };
  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className='my-4'>
            <label className='text-muted block text-left text-sm text-gray-700'>
              Delivery address
            </label>
            <textarea
              onChange={handleAddress}
              className='form-textarea w-full text-sm mt-2 block rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400'
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
          <button
            onClick={buy}
            className='shadow-lg bg-purple-400 py-2 text-purple-100 px-4 rounded text-sm hover:bg-purple-500 mt-2'
          >
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
    loading && <p className='font-light text-blue-400'>Loading...</p>;
  const showError = (error) => (
    <div
      className='py-1 bg-red-300 text-gray-900 px-2'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );
  const showMsg = (success) => (
    <div
      className='py-1 bg-green-300 text-gray-900 px-2'
      style={{ display: success ? '' : 'none' }}
    >
      Thanks! Your payment is completed!
    </div>
  );
  return (
    <div>
      <div>
        <span className='block font-light'>Total:</span>
        <span className='text-4xl font-bold'>${getTotal()}</span>
      </div>

      {showLoading(data.loading)}
      {showError(data.error)}
      {showMsg(data.success)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
