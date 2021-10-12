import { isAuthenticated } from 'api/auth';
import { getPurchaseHistory } from 'api/user';
import { Layout } from 'components';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const loadPurchaseHistory = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };
  const {
    foundUser: { _id, name, email, role },
    token,
  } = isAuthenticated();

  useEffect(() => {
    loadPurchaseHistory(_id, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userLinks = () => (
    <div className='card'>
      <h5 className='card-header'>User Links</h5>
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link className='nav-link' to='/cart'>
            Cart
          </Link>
        </li>
        <li className='list-group-item'>
          <Link className='nav-link' to={`/profile/${_id}`}>
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <Layout
      className='container'
      title='Dashboard'
      description={`Hey ${name}!`}
    >
      <div className='row'>
        <div className='col-md-3'>{userLinks()}</div>
        <div className='col-md-9'>
          <div className='card mb-5'>
            <h5 className='card-header'>User Information</h5>
            <ul className='list-group'>
              <li className='list-group-item'>{name}</li>
              <li className='list-group-item'>{email}</li>
              <li className='list-group-item'>
                {role === 1 ? 'Admin' : 'Registered User'}
              </li>
            </ul>
          </div>
          <div className='card'>
            <h5 className='card-header'>Purchase history</h5>
            <ul className='list-group'>
              <li className='list-group-item'>
                {history.map((h, index) => {
                  return (
                    <div key={index}>
                      <hr />
                      {h.products.map((product, pIndex) => {
                        return (
                          <div key={pIndex}>
                            <h6>Product name: {product.name}</h6>
                            <h6>Product price: {product.price}</h6>
                            <h6>
                              Purchased date: {moment(h.createdAt).fromNow()}
                            </h6>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
