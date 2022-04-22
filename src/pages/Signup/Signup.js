import React, { useState } from 'react';
import { isAuthenticated, signup } from '../../api/auth';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useToasts } from 'react-toast-notifications';
import LoginCover from '../../assets/bg-image.png';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: '',
  });
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signup(data).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
        addToast(data.error, {
          appearance: 'error',
          autoDismiss: true,
        });
      } else {
        addToast('Congrats! Account created successfully! Please sign in.', {
          appearance: 'success',
          autoDismiss: true,
        });
        reset();
      }
    });
  };

  const redirectUser = () => {
    if (isAuthenticated()) {
      return <Redirect to='/' />;
    }
  };
  return (
    <>
      {redirectUser()}
      <div
        className='h-full w-full bg-no-repeat bg-fixed bg-cover bg-center md:h-screen md:overflow-y-auto'
        style={{
          backgroundImage: `url(${LoginCover})`,
        }}
      >
        <div className='p-8 md:mx-auto md:max-w-6xl md:h-full'>
          <div className='pt-10 md:grid md:grid-cols-2 w-full'>
            {/* content side */}
            <div className='w-full md:flex md:flex-col md:justify-center'>
              <h1 className='font-black text-4xl leading-snug text-center md:text-left '>
                Fast & Free Store Pickup
              </h1>
              <p className='font-medium mt-4 mb-6 text-base'>
                Get your order delivered to your door step in just{' '}
                <span className='font-bold'>1 HOUR OR LESS!</span>
              </p>
            </div>
            {/* login form */}
            <div className='w-full bg-white py-8 px-6 shadow-2xl rounded-xl'>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <p className='text-center text-xl font-medium text-gray-900'>
                  Create eDuuka account to get started.
                </p>
                <div>
                  <label
                    htmlFor='username'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Username
                  </label>
                  <div className='mt-1'>
                    <input
                      {...register('name', {
                        required: 'Username is required',
                        minLength: {
                          value: 3,
                          message: 'Username must be atleast 3 characters',
                        },
                      })}
                      type='text'
                      className='form-input rounded-lg w-full border-gray-300 shadow-sm focus:outline-none focus:border-black focus:ring-black placeholder-gray-400 text-sm'
                      name='name'
                      id='username'
                      placeholder='Username e.g Stephen'
                    />
                    <ErrorMessage
                      errors={errors}
                      name='name'
                      render={({ message }) => (
                        <p className='text-sm text-red-400 font-medium'>
                          {message}
                        </p>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Account
                  </label>
                  <div className='mt-1'>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        minLength: {
                          value: 6,
                          message: 'Email must be atleast 6 characters',
                        },
                      })}
                      type='email'
                      className='form-input rounded-lg w-full border-gray-300 shadow-sm focus:outline-none focus:border-black focus:ring-black placeholder-gray-400 text-sm'
                      name='email'
                      id='email'
                      placeholder='Email Address'
                    />
                    <ErrorMessage
                      errors={errors}
                      name='email'
                      render={({ message }) => (
                        <p className='text-sm text-red-400 font-medium'>
                          {message}
                        </p>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Password
                  </label>
                  <div className='mt-1'>
                    <input
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be atleast 6 characters',
                        },
                      })}
                      type='password'
                      className='form-input rounded-lg w-full border-gray-300 shadow-sm focus:outline-none focus:border-black focus:ring-black placeholder-gray-400 text-sm'
                      id='password'
                      placeholder='Password'
                    />
                    <ErrorMessage
                      errors={errors}
                      name='password'
                      render={({ message }) => (
                        <p className='text-sm text-red-400 font-medium'>
                          {message}
                        </p>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <input
                    type='submit'
                    className='w-full py-2 px-4 rounded bg-gray-800 hover:bg-gray-900 text-white
                border border-transparent text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                '
                    value='Sign Up'
                  />
                </div>
                <div>
                  <p className='text-gray-900 text-base'>
                    Have eDuuka account?{' '}
                    <Link
                      to='/signin'
                      className='text-sm font-semibold text-blue-500'
                    >
                      Sigin now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <footer className='text-center pt-20 md:pt-24'>
            <span className='text-sm text-white font-medium'>
              &copy;2021 eDuuka. All rights reversed.
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Signup;
