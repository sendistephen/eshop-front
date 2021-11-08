import React, { useEffect, useState } from 'react';
import { isAuthenticated } from 'api/auth';
import { getCategories } from 'api/category';
import { createProduct } from 'api/product';
import { Link } from 'react-router-dom';

const CreateProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    shipping: '',
    photo: '',
    categories: [],
    category: '',
    error: '',
    success: '',
    loading: false,
    redirectToProfile: false,
    formData: '',
  });
  const {
    name,
    description,
    price,
    quantity,
    categories,
    error,
    success,
    loading,
    formData,
  } = values;

  //   load categories and initialize formData
  const initializeCategoriesAndFormData = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    initializeCategoriesAndFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { foundUser, token } = isAuthenticated();

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: '',
      loading: true,
    });
    createProduct(foundUser._id, token, formData).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          quantity: '',
          shipping: '',
          photo: '',
          categories: [],
          category: '',
          error: '',
          success: true,
          loading: false,
          formData: '',
        });
      }
    });
  };

  const productForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='mt-4'>
        <label
          className='block text-sm font-medium text-gray-900 mb-2'
          for='product image'
        >
          Upload Photo
        </label>
        <input
          onChange={handleChange('photo')}
          type='file'
          name='photo'
          accept='image/*'
          className='block w-full cursor-pointer  bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm'
        />
      </div>
      <div className=' mt-2'>
        <label
          className='block text-sm font-medium text-gray-900 mb-2'
          htmlFor='name'
        >
          Name
        </label>
        <input
          onChange={handleChange('name')}
          value={name}
          type='text'
          className='w-full'
        />
      </div>
      <div className='mt-2'>
        <label
          className='block text-sm font-medium text-gray-900 mb-2'
          htmlFor='description'
        >
          Description
        </label>
        <textarea
          onChange={handleChange('description')}
          value={description}
          className='w-full'
        />
      </div>
      <div className='mt-2'>
        <label
          className='block text-sm font-medium text-gray-900 mb-2'
          htmlFor='price'
        >
          Price
        </label>
        <input
          onChange={handleChange('price')}
          value={price}
          type='number'
          className='w-full'
        />
      </div>
      <div className='mt-2'>
        <label
          className='block text-sm font-medium text-gray-900 mb-2'
          htmlFor='quantity'
        >
          Quantity
        </label>
        <input
          onChange={handleChange('quantity')}
          value={quantity}
          type='number'
          className='w-full'
        />
      </div>
      <div className='mt-2'>
        <label
          className='block text-sm font-medium text-gray-900 mb-2'
          htmlFor='category'
        >
          Category
        </label>
        <select onChange={handleChange('category')} className='w-full'>
          <option>Please select</option>
          {categories &&
            categories.map((c, index) => (
              <option key={index} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group mt-2'>
        <label
          className='block text-sm font-medium text-gray-900 mb-2'
          htmlFor='shipping'
        >
          Shipping
        </label>
        <select onChange={handleChange('shipping')} className='w-full'>
          <option>Please select</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div>
      <button className='py-2 px-2 bg-blue-600 text-white font-semibold  my-4 rounded text-sm'>
        Create Product
      </button>
    </form>
  );

  const showLoading = () =>
    loading && (
      <div className='py-1 px-4 bg-red-300 font-medium text-gray-900'>
        <p>Loading...</p>
      </div>
    );
  const showSuccess = () => (
    <div
      className='py-2 px-4 bg-green-200 font-medium text-gray-900'
      style={{ display: success ? '' : 'none' }}
    >
      Product created successfully
    </div>
  );
  const showError = () => (
    <div
      className='py-2 px-4 bg-red-300 font-medium text-black text-sm rounded'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );
  const goBack = () => (
    <div className='mt-5 text-sm text-purple-500'>
      <Link to='/admin/dashboard'>Back to Dashboard</Link>
    </div>
  );

  return (
    <div className='px-8 py-8 mt-12 w-8/12 mx-auto'>
      <h1 className='font-normal my-4'>{`Hey ${foundUser.name}, ready to add new product`}</h1>
      <div className='bg-white shadow px-12 py-2 rounded'>
        <div>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {productForm()}
        </div>
      </div>
      {goBack()}
    </div>
  );
};

export default CreateProduct;
