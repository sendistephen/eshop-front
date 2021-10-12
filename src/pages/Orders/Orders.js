/* eslint-disable react-hooks/exhaustive-deps */
import { isAuthenticated } from 'api/auth';
import { listOrders, getPaymentStatus, updateOrderStatus } from 'api/order';
import { Layout } from 'components';
import moment from 'moment';
import { useEffect, useState } from 'react';

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
        <h5 className='text-danger display-5'>Total orders:{orders.length}</h5>
      );
    } else {
      return <h5 className='text-danger'>No orders</h5>;
    }
  };
  const showInput = (key, value) => (
    <div className='input-group mb-2 mr-sm-2'>
      <div className='input-group-prepend'>
        <div className='input-group-text'>{key}</div>
      </div>
      <input type='text' value={value} className='form-control' readOnly />
    </div>
  );
  const showStatus = (order) => (
    <div className='form-group'>
      <h3 className='mark mb-4'>Status:{order.status}</h3>
      <select
        className='form-control'
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
    <Layout
      className='container '
      title='Orders'
      description={`Hey ${name}, you can manage all the orders here`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showOrdersLength()}
          {orders.map((order, i) => {
            return (
              <div
                className='mt-5'
                key={i}
                style={{ borderBottom: '5px solid indigo' }}
              >
                <h4 className='bg-primary'>Order ID:{order._id}</h4>
                <ul className='list-group mb-2'>
                  <li className='list-group-item'>
                    Status: {showStatus(order)}
                  </li>
                  <li className='list-group-item'>
                    Transaction ID: {order.transaction_id}
                  </li>

                  <li className='list-group-item'>
                    Delivery address: {order.address}
                  </li>
                  <li className='list-group-item'>
                    Ordered on: {moment(order.createdAt).fromNow()}
                  </li>
                </ul>
                <h3 className='mt-4 mb-4 font-italic'>
                  Total products in the order:{order.products.length}
                </h3>
                {order.products.map((product, pIndex) => (
                  <div
                    className='mb-4'
                    key={pIndex}
                    style={{ padding: '20px', border: '1px solid lightgreen' }}
                  >
                    {showInput('Product name', product.name)}
                    {showInput('Product price', product.price)}
                    {showInput('Product total', product.count)}
                    {showInput('Product Id', product._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
