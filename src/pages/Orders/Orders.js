/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { isAuthenticated } from 'api/auth';
import { listOrders, getPaymentStatus, updateOrderStatus } from 'api/order';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const {
    foundUser: { _id, name },
    token,
  } = isAuthenticated();

  const loadOrders = () => {
    listOrders(_id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };
  const loadPaymentStatus = () => {
    getPaymentStatus(_id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };
  useEffect(() => {
    loadOrders();
    loadPaymentStatus();
  }, []);
  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(_id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Status update failed');
      } else {
        loadOrders();
      }
    });
  };
  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className='text-2xl font-medium'>Total orders:{orders.length}</h1>
      );
    } else {
      return <h5 className='text-sm text-gray-600'>No orders</h5>;
    }
  };
  const showInput = (key, value) => (
    <div className='mb-2 mr-sm-2'>
      <div className=''>
        <div className='text-gray-500'>{key}</div>
      </div>
      <input type='text' value={value} className='w-full py-1' readOnly />
    </div>
  );
  const showStatus = (order) => (
    <div className='my-2'>
      <h3 className='inline-block mr-10 mb-2 font-medium uppercase text-gray-900 text-sm'>
        Status
      </h3>
      <span className='py-1 px-2 text-sm bg-pink-500 text-pink-100'>
        {order.status}
      </span>
      <select
        className='w-full text-sm text-gray-600'
        onChange={(e) => handleStatusChange(e, order._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
  return (
    <div className='px-8'>
      <h1 className='text-black text-2xl my-8 text-center'>{`Hey ${name}, you can manage all the orders here`}</h1>
      <div className='px-4 py-4 w-8/12 mx-auto bg-white shadow'>
        {showOrdersLength()}
        {orders.map((myOrder, i) => {
          return (
            <div className='mt-5' key={i}>
              <div className='text-sm'>
                <h4 className='inline py-1 px-2 bg-gray-300 border border-1 border-gray-500'>
                  Order ID
                </h4>
                <span className='inline py-1 px-2 text-pink-500 ml-4 border border-1 border-pink-200'>
                  {myOrder._id}
                </span>
              </div>
              <ul className='mt-2'>
                <li className='py-2'>
                  <span>{showStatus(myOrder)}</span>
                </li>
                <li className='list-group-item'>
                  <p className='font-medium uppercase text-gray-900 text-sm'>
                    Transaction ID
                  </p>
                  <span className='text-sm text-pink-500'>
                    {myOrder.transaction_id}
                  </span>
                </li>

                <li className='mt-2'>
                  <p className='font-medium uppercase text-gray-900 text-sm'>
                    Delivery address
                  </p>
                  <span className='text-sm text-pink-500'>
                    {myOrder.address}
                  </span>
                </li>
                <li className='mt-2'>
                  <p className='font-medium uppercase text-gray-900 text-sm'>
                    Ordered on
                  </p>
                  <span className='text-sm text-pink-500'>
                    {moment(myOrder.createdAt).fromNow()}
                  </span>
                </li>
              </ul>
              <h3 className='mt-4 mb-4 text-gray-900 font-bold'>
                Total products in the order:{myOrder.products.length}
              </h3>
              {myOrder.products.map((product, pIndex) => (
                <div className='mb-4' key={pIndex}>
                  {showInput('Product Name', product.name)}
                  {showInput('Product Price', product.price)}
                  {showInput('Product Total', product.count)}
                  {showInput('Product ID', product._id)}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
