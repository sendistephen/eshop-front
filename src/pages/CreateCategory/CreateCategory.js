import React, { useState } from 'react';
import { isAuthenticated } from '../../api/auth';
import { createCategory } from '../../api/category';
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
      <div className=''>
        <label
          htmlFor='name'
          className='text-muted block text-left text-gray-900 text-sm'
        >
          Name
        </label>
        <input
          onChange={handleChange}
          value={name}
          autoFocus
          required
          type='text'
          className='py-1 rounded text-sm text-gray-800'
        />
      </div>
      <button className='mt-3 text-sm bg-blue-500 px-2 text-white py-1 font-medium rounded'>
        Create Category
      </button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return (
        <div className='py-2 px-2 bg-green-300 text-black text-sm font-semibold'>
          <p>Category is created</p>
        </div>
      );
    }
  };
  const showError = () => {
    if (error) {
      return (
        <div className='my-4 py-2 px-2 bg-red-300 text-black text-sm font-semibold rounded w-56'>
          <p>Category should be unique</p>
        </div>
      );
    }
  };

  const goBack = () => (
    <div className='mt-5 text-sm text-purple-500'>
      <Link to='/admin/dashboard'>Back to Dashboard</Link>
    </div>
  );
  return (
    <div className='px-8'>
      <div className='mt-8 text-gray-700'>
        <h1>{`Hey ${foundUser.name}, ready to add new category`}</h1>
      </div>
      <div className='mt-8'>
        <div className='col-md-4 offset-4'>
          {showError()}
          {showSuccess()}
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
