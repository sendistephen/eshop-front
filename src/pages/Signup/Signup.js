import { isAuthenticated, signup } from 'api/auth';
import { Layout } from 'components';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: '',
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
        });
      }
    });
  };

  const signupForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='name' className='text-muted'>
          Name
        </label>
        <input
          onChange={handleChange('name')}
          value={name}
          type='text'
          className='form-control'
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor='email' className='text-muted'>
          Email
        </label>
        <input
          onChange={handleChange('email')}
          value={email}
          type='email'
          className='form-control'
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor='password' className='text-muted'>
          Password
        </label>
        <input
          onChange={handleChange('password')}
          value={password}
          type='password'
          className='form-control'
        />
      </div>
      <button className='btn btn-primary mt-3'>Sign up</button>
    </form>
  );
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}
    >
      Congrats! New Account is created. Please signin.
    </div>
  );
  const redirectUser = () => {
    if (isAuthenticated()) {
      return <Redirect to='/' />;
    }
  };
  return (
    <Layout
      title='Signup'
      description='Register for an account to get started'
      className='container col-md-4 offset-md-4'
    >
      {showError()}
      {showSuccess()}
      {signupForm()}
      {redirectUser()}
    </Layout>
  );
}

export default Signup;
