import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../api/auth';
import { getPurchaseHistory } from '../../api/user';
import moment from 'moment';
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
    <>
      <h5 className='font-bold my-4'>User Links</h5>
      <div className='bg-white rounded-lg border border-gray-200 text-indigo-700 font-medium text-sm mb-4'>
        <li className='block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg cursor-pointer hover:text-gray-900'>
          <Link className='nav-link' to='/cart'>
            Cart
          </Link>
        </li>
        <li className='block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg cursor-pointer hover:text-gray-900'>
          <Link className='nav-link' to={`/profile/${_id}`}>
            Update Profile
          </Link>
        </li>
      </div>
    </>
  );

  return (
    <div className='px-8'>
      <div className='mt-12'>
        <div className='bg-white px-8 py-2 rounded'>
          <h1 className='text-2xl'>User Dashboard</h1>
          <span className='text-sm text-purple-800'>{`Hey ${name}!`}</span>
        </div>
        <div className='bg-white px-8 py-2 rounded mt-4 flex'>
          <div className='w-48'>{userLinks()}</div>
          <div className='ml-24 w-full '>
            <h4 className='font-bold mt-4'>User Information</h4>
            <ul className='font-medium border border-gray-200 rounded-lg mt-4 text-sm'>
              <li className='block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg '>
                {name}
              </li>
              <li className='block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg '>
                {email}
              </li>{' '}
              <li className='block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg '>
                {role === 1 ? 'Admin' : 'Registered User'}{' '}
              </li>{' '}
            </ul>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h5 className='text-purple-700 font-medium mb-4'>Purchase history</h5>
        <ul className='bg-white px-8 py-2 rounded'>
          <li className='py-2 px-2 bg-blue-100 rounded mb-2'>
            {history.map((h, index) => {
              return (
                <div key={index} >
                  {h.products.map((product, pIndex) => {
                    return (
                      <div key={pIndex} className='grid grid-cols-3 gap-4 items-center w-full'>
                        <div>
                          <h6 className='text-medium text-sm'>Product Name</h6>
                          <span className='text-sm text-gray-500'>
                            {product.name}
                          </span>
                        </div>
                        <div>
                          <h6 className='text-medium text-sm'>Price</h6>
                          <span className='text-sm text-gray-500'>
                            {product.price}
                          </span>
                        </div>
                        <div>
                          <h6 className='text-medium text-sm'>
                            Purchased Date
                          </h6>
                          <span className='text-sm text-gray-500'>
                            {moment(h.createdAt).fromNow()}
                          </span>
                        </div>
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
  );
};

export default Dashboard;

// return (
//   <div className='px-8 mt-12'>
//     <div className='bg-white px-8 py-2 rounded'>
//       <h1 className='text-2xl'>Admin Dashboard</h1>
//       <span className='text-sm text-purple-800'>{`Hey ${name}!`}</span>
//     </div>
//     <div className='bg-white px-8 py-2 rounded mt-4 flex'>
//       <div className='w-48'>{adminLinks()}</div>
//       <div className='ml-24 w-full '>
//         <h4 className='font-bold mt-4'>Admin Information</h4>
//         <ul className='font-medium border border-gray-200 rounded-lg mt-4 text-sm'>
//           <li className='block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg '>
//             {name}
//           </li>
//           <li className='block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg '>
//             {email}
//           </li>{' '}
//           <li className='block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg '>
//             {role === 1 ? 'Admin' : 'Registered User'}{' '}
//           </li>{' '}
//         </ul>
//       </div>
//     </div>
//   </div>
