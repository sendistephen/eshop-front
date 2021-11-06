import React from 'react';
import { isAuthenticated } from 'api/auth';
import { itemTotal } from 'components/Cart/CartHelpers';
import { Link, withRouter } from 'react-router-dom';
import { isActive } from 'utils';
import {
  HomeIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';
import Logo from 'assets/LOGO.png';
import { Search } from 'components';

function Navbar({ history }) {
  return (
    <nav className='my-4 px-4 flex justify-between items-center w-full'>
      <Link to='/' className='justify-start'>
        <img className='h-18 w-18 md:h-16 md:w-16' src={Logo} alt='eDuuka' />
      </Link>
      {/* Search component */}
      <div className='w-1/3 items-center'>
        <Search />
      </div>
      <div className='justify-end'>
        <ul className='flex text-xs space-x-6'>
          <li>
            <Link
              to='/'
              className='flex flex-col items-center active'
              style={isActive(history, '/')}
            >
              <HomeIcon className='h-8 w-8' />
              <span className='hover:underline'>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to='/shop'
              className='flex flex-col items-cente'
              style={isActive(history, '/shop')}
            >
              <ShoppingBagIcon className='h-8 w-8' />
              <span className='hover:underline'>Shop</span>
            </Link>
          </li>
          <li>
            <Link
              to='/cart'
              className='flex flex-col items-center'
              style={isActive(history, '/cart')}
            >
              <div className='relative flex'>
                <ShoppingCartIcon className='h-8 w-8' />
                <span className='absolute right-0 top-0 top right leading-tight font-mono w-2 h-2 text-center text-xs rounded-full bg-red-600 text-white p-1.5 m-0 flex  justify-center items-center'>
                  {itemTotal()}
                </span>
              </div>
              <span className='hover:underline'>Cart</span>
            </Link>
          </li>
          {isAuthenticated() && isAuthenticated().foundUser.role === 0 && (
            <li>
              <Link to='/user/dashboard' className='flex flex-col items-center'>
                <ViewGridIcon className='h-6 w-6' />
                <span className='hover:underline'>Dashboard</span>
              </Link>
            </li>
          )}
          {isAuthenticated() && isAuthenticated().foundUser.role === 1 && (
            <li>
              <Link
                to='/admin/dashboard'
                style={isActive(history, '/admin/dashboard')}
                className='flex flex-col items-center'
              >
                <ViewGridIcon className='h-6 w-6' />
                <span className='hover:underline'>Dashboard</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
