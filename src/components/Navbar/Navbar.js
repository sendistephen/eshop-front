import React from 'react';
import { isAuthenticated, signout } from 'api/auth';
import { itemTotal } from 'components/Cart/CartHelpers';
import { Link, withRouter } from 'react-router-dom';
import { isActive } from 'utils';

function Navbar({ history }) {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Shoppers
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link
                className='nav-link active'
                aria-current='page'
                to='/'
                style={isActive(history, '/')}
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link active'
                aria-current='page'
                to='/shop'
                style={isActive(history, '/shop')}
              >
                Shop
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link active'
                aria-current='page'
                to='/cart'
                style={isActive(history, '/cart')}
              >
                Cart <span className='badge bg-secondary'>{itemTotal()}</span>
              </Link>
            </li>
            {isAuthenticated() && isAuthenticated().foundUser.role === 0 && (
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/user/dashboard'
                  style={isActive(history, '/user/dashboard')}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().foundUser.role === 1 && (
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/admin/dashboard'
                  style={isActive(history, '/admin/dashboard')}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <>
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    to='/signup'
                    style={isActive(history, '/signup')}
                  >
                    Sign up
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    to='/signin'
                    style={isActive(history, '/signin')}
                  >
                    Sign in
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated() && (
              <>
                <li className='nav-item'>
                  <span
                    className='nav-link'
                    style={{ cursor: 'pointer', color: '#fff' }}
                    onClick={() => signout(() => history.push('/'))}
                  >
                    Sign out
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
