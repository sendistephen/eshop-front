import { isAuthenticated } from 'api/auth';
import { read, update, updateUser } from 'api/user';
import { Layout } from 'components';
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
      <div className='form-group'>
        <label htmlFor='name' className='text-muted'>
          Name
        </label>
        <input
          type='text'
          onChange={handleChange('name')}
          value={name}
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='email' className='text-muted'>
          Email
        </label>
        <input
          type='email'
          onChange={handleChange('email')}
          value={email}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password' className='text-muted'>
          Password
        </label>
        <input
          type='password'
          onChange={handleChange('password')}
          value={password}
          className='form-control'
        />
      </div>
      <button onClick={handleSubmit} className='btn btn-primary btn-sm'>
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title='Profile'
      description='Update your profile'
      className='container'
    >
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};
export default Profile;
