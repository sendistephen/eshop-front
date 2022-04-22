import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { PhoneIcon } from '@heroicons/react/solid';
import { isAuthenticated, signout } from '../../api/auth';

const Header = () => {
  const history = useHistory();

  return (
    <header className='py-1 px-8 bg-green-400'>
      <div className='flex justify-between items-center '>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-1'>
            <PhoneIcon className='h-4 w-4' />
            <span className='text-xs font-semibold'>(+256 755090661)</span>
          </div>
          <div className='flex items-center space-x-1'>
            <svg
              className='h-4 w-4'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.40356 7.06085L12 11.8584L21.5964 7.06085C21.5608 6.44938 21.2929 5.87463 20.8474 5.45432C20.4018 5.03401 19.8125 4.79994 19.2 4.80005H4.79996C4.18747 4.79994 3.5981 5.03401 3.15258 5.45432C2.70705 5.87463 2.43909 6.44938 2.40356 7.06085V7.06085Z'
                fill='black'
              />
              <path
                d='M21.6 9.7417L12 14.5417L2.40002 9.7417V16.8001C2.40002 17.4366 2.65288 18.0471 3.10297 18.4972C3.55306 18.9472 4.1635 19.2001 4.80002 19.2001H19.2C19.8365 19.2001 20.447 18.9472 20.8971 18.4972C21.3472 18.0471 21.6 17.4366 21.6 16.8001V9.7417Z'
                fill='black'
              />
            </svg>

            <span className='text-xs font-semibold'>info@eduuka.com</span>
          </div>
        </div>
        <div className='text-xs font-medium space-x-1'>
          {!isAuthenticated() && (
            <>
              <Link
                to='/signin'
                className='text-gray-900 hover:text-gray-100 active:text-gray-100'
              >
                Sign In
              </Link>
              <span>/ </span>
              <Link
                to='/signup'
                className='text-gray-900 hover:text-gray-100 active:text-gray-100'
              >
                Sign Up
              </Link>
            </>
          )}
          {isAuthenticated() && (
            <span
              className='hover:text-gray-100 cursor-pointer transform transition'
              onClick={() => signout(() => history.push('/'))}
            >
              Sign out
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
