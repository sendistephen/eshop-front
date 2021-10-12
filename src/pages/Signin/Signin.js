import { signin, authenticate, isAuthenticated } from 'api/auth';
import { Layout } from 'components';
import { Redirect } from 'react-router-dom';

const { useState } = require('react');

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  });
  const { email, password, error, redirectToReferrer, loading } = values;
  const { foundUser } = isAuthenticated();
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signin({ email, password, loading: true }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
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
      <button className='btn btn-primary mt-3'>Sign In</button>
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

  const showLoading = () => {
    loading && (
      <div className='alert alert-info'>
        <p className='lead'>Loading...</p>
      </div>
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (foundUser && foundUser.role === 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/user/dashboard' />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/' />;
    }
  };

  return (
    <Layout
      className='container col-md-4 offset-md-4'
      title='Sign In'
      description='Login to your Shoppers account'
    >
      {showLoading()}
      {showError()}
      {loginForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
