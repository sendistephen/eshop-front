import { isAuthenticated } from 'api/auth';
import { createCategory } from 'api/category';
import { Layout } from 'components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { foundUser, token } = isAuthenticated();

  const handleChange = (e) => {
    setError('');
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // make a request to the api
    createCategory(foundUser._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName('');
        setError('');
        setSuccess(true);
      }
    });
  };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='name' className='text-muted'>
          Name
        </label>
        <input
          onChange={handleChange}
          value={name}
          autoFocus
          required
          type='text'
          className='form-control'
        />
      </div>
      <button className='btn btn-outline-secondary mt-3'>Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return (
        <div className='alert alert-success'>
          <span className='text-success p-0'>Category is created</span>
        </div>
      );
    }
  };
  const showError = () => {
    if (error) {
      return (
        <div className='alert alert-danger'>
          <span className='text-danger p-0'>Category should be unique</span>
        </div>
      );
    }
  };

  const goBack = () => (
    <div className='mt-5'>
      <Link to='/admin/dashboard'>Back to Dashboard</Link>
    </div>
  );
  return (
    <Layout
      className='container '
      title='Add new category'
      description={`Hey ${foundUser.name}, ready to add new category`}
    >
      <div className='row'>
        <div className='col-md-4 offset-4'>
          {showError()}
          {showSuccess()}
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
