import { isAuthenticated } from 'api/auth';
import { getCategories } from 'api/category';
import { createProduct } from 'api/product';
import { Layout } from 'components';
import React, { useEffect, useState } from 'react';

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
      <h5>Upload Photo</h5>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image/*'
          />
        </label>
      </div>
      <div className='form-group mt-2'>
        <label htmlFor='name'>Name</label>
        <input
          onChange={handleChange('name')}
          value={name}
          type='text'
          className='form-control'
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor='descrition'>Description</label>
        <textarea
          onChange={handleChange('description')}
          value={description}
          className='form-control'
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor='name'>Price</label>
        <input
          onChange={handleChange('price')}
          value={price}
          type='number'
          className='form-control'
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor='name'>Quantity</label>
        <input
          onChange={handleChange('quantity')}
          value={quantity}
          type='number'
          className='form-control'
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor='category'>Category</label>
        <select onChange={handleChange('category')} className='form-control'>
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
        <label htmlFor='shipping'>Shipping</label>
        <select onChange={handleChange('shipping')} className='form-control'>
          <option>Please select</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div>
      <button className='btn btn-dark mt-4'>Create Product</button>
    </form>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <p className='lead'>Loading...</p>
      </div>
    );
  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}
    >
      Product created successfully
    </div>
  );
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );
  const goBack = () => {};

  return (
    <Layout
      className='container mb-5'
      title='Add new product'
      description={`Hey ${foundUser.name}, ready to add new product`}
    >
      <div className='row'>
        <div className='col-md-4 offset-4'>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {productForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
