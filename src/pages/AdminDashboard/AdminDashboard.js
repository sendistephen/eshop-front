import { Link } from 'react-router-dom';
import { isAuthenticated } from 'api/auth';

const AdminDashboard = () => {
  const {
    foundUser: { name, email, role },
  } = isAuthenticated();

  const adminLinks = () => (
    <>
      <h5 className='font-bold my-4'>Admin Links</h5>
      <div className='bg-white rounded-lg border border-gray-200 text-gray-900 font-medium text-sm mb-4'>
        <li className='block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg cursor-pointer'>
          <Link className='nav-link' to='/admin/category/create'>
            Create Category
          </Link>
        </li>
        <li className='block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg cursor-pointer'>
          <Link className='nav-link' to='/admin/product/create'>
            Create Product
          </Link>
        </li>
        <li className='block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg cursor-pointer'>
          <Link className='nav-link' to='/admin/orders'>
            View Orders
          </Link>
        </li>
        <li className='block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg cursor-pointer'>
          <Link className='nav-link' to='/admin/products'>
            Manage Products
          </Link>
        </li>
      </div>
    </>
  );

  return (
    <div className='px-8 mt-12'>
      <div className='bg-white px-8 py-2 rounded'>
        <h1 className='text-2xl'>Admin Dashboard</h1>
        <span className='text-sm text-purple-800'>{`Hey ${name}!`}</span>
      </div>
      <div className='bg-white px-8 py-2 rounded mt-4 flex'>
        <div className='w-48'>{adminLinks()}</div>
        <div className='ml-24 w-full '>
          <h4 className='font-bold mt-4'>Admin Information</h4>
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
  );
};

export default AdminDashboard;
