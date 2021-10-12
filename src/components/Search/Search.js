import { getCategories } from 'api/category';
import { list } from 'api/product';
import Product from 'components/Product';
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
    <form onSubmit={handleSubmit} className='mb-3'>
      <span className='input-group-text'>
        <div className='input-group input-group-lg'>
          <div className='input-group-prepend'>
            <select className='btn m-2' onChange={handleChange('category')}>
              <option value='All'>All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type='search'
            className='form-control'
            onChange={handleChange('search')}
            placeholder='Search by name'
          />
        </div>
        <div className='btn input-group-append' style={{ border: 'none' }}>
          <button className='input-group-text'>Search</button>
        </div>
      </span>
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
