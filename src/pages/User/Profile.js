import { isAuthenticated } from 'api/auth';
import { read, update, updateUser } from 'api/user';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
  });
  const { name, email, password, success } = values;
  const { token } = isAuthenticated();

  const loadUserInfo = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
        });
      }
    });
  };

  useEffect(() => {
    loadUserInfo(match.params.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: true });
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };
  const redirectUser = (success) => {
    if (success) {
      return <Redirect to='/cart' />;
    }
  };
  const profileUpdate = (name, email, password) => (
    <form>
      <div className='mt-1'>
        <label
          htmlFor='name'
          className='block text-sm font-semibold text-gray-800'
        >
          Name
        </label>
        <input
          type='text'
          onChange={handleChange('name')}
          value={name}
          className='w-full text-gray-700 text-sm'
        />
      </div>

      <div className='mt-1'>
        <label
          htmlFor='email'
          className='block text-sm font-semibold text-gray-800'
        >
          Email
        </label>
        <input
          type='email'
          onChange={handleChange('email')}
          value={email}
          className='w-full text-gray-700 text-sm'
        />
      </div>
      <div className='mt-1'>
        <label
          htmlFor='password'
          className='block text-sm font-semibold text-gray-800'
        >
          Password
        </label>
        <input
          type='password'
          onChange={handleChange('password')}
          value={password}
          className='w-full text-gray-700 text-sm'
        />
      </div>
      <button
        onClick={handleSubmit}
        className='text-sm py-2 px-2 bg-green-600 text-green-100 mt-2 rounded font-semibold'
      >
        Update
      </button>
    </form>
  );

  return (
    <div className='mt-8 px-8'>
      <h1 className='text-purple-700 mb-4 text-center'>Update your profile</h1>
      <div className='bg-white px-4 py-4 w-6/12 mx-auto rounded shadow-md'>
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
      </div>
    </div>
  );
};
export default Profile;
