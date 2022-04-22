import React from "react";
import { getCategories } from '../../api/category';
import { list } from '../../api/product';
import Product from '../../components/Product';
import { useEffect, useState } from 'react';

export default function Search() {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
      searched: false,
    });
  };
  const searchedProducts = (results = []) => {
    return (
      <>
        <div className='mb-4 mt-4'>{searchMessage(searched, results)}</div>
        <div className='row'>
          {results.map((product, i) => (
            <Product key={i} product={product} />
          ))}
        </div>
      </>
    );
  };
  const searchedData = () => {
    if (search) {
      list({ search: search || undefined, category }).then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          setData({ ...data, results: res, searched: true });
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchedData();
  };
  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return 'No products found';
    }
  };

  const searchForm = () => (
    <form onSubmit={handleSubmit} className=''>
      <div className='relative '>
        <div className='absolute inset-y-0 left-0 flex items-center rounded-md'>
          <label htmlFor='category' className='sr-only'>
            Category
          </label>
          <select
            onChange={handleChange('category')}
            className='text-sm focus:ring-green-400 focus:border-green-400 h-full py-0 border-transparent bg-transparent text-gray-500 rounded-md'
            name='category'
            id='category'
          >
            <option value='All'>All</option>
            {categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <input
          onChange={handleChange('search')}
          className='pl-32 md:pl-36 focus:ring-green-400 focus:border-green-400 block w-full border-gray-300 rounded-md text-sm'
          type='text'
          name=''
          placeholder='Search by product name'
        />
      </div>
    </form>
  );
  return (
    <div>
      <div className='row'>
        <div className='container'>
          {searchForm()}
          {searchedProducts(results)}
        </div>
      </div>
    </div>
  );
}
