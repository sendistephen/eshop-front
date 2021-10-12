import { isAuthenticated } from 'api/auth';
import { Layout } from 'components';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const {
    foundUser: { name, email, role },
  } = isAuthenticated();

  const adminLinks = () => (
    <div className='card'>
      <h5 className='card-header'>Admin Links</h5>
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link className='nav-link' to='/admin/category/create'>
            Create Category
          </Link>
        </li>
        <li className='list-group-item'>
          <Link className='nav-link' to='/admin/product/create'>
            Create Product
          </Link>
        </li>
        <li className='list-group-item'>
          <Link className='nav-link' to='/admin/orders'>
            View Orders
          </Link>
        </li>
        <li className='list-group-item'>
          <Link className='nav-link' to='/admin/products'>
            Manage Products
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <Layout
      className='container'
      title='Admin Dashboard'
      description={`Hey ${name}!`}
    >
      <div className='row'>
        <div className='col-md-3'>{adminLinks()}</div>
        <div className='col-md-9'>
          <div className='card mb-5'>
            <h5 className='card-header'>Admin Information</h5>
            <ul className='list-group'>
              <li className='list-group-item'>{name}</li>
              <li className='list-group-item'>{email}</li>
              <li className='list-group-item'>
                {role === 1 ? 'Admin' : 'Registered User'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
