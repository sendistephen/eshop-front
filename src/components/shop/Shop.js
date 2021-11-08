import { useEffect, useState } from 'react';
import { getCategories } from 'api/category';
import Layout from 'components/Layout';
import Product from 'components/Product';
import Checkbox from 'components/Checkbox';
import RadioBox from 'components/RadioBox';
import { prices } from 'utils';
import { fetchFilteredProducts } from 'api/product';

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [error, setError] = useState(false);

  //   load categories from the api
  const fetchCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  const loadFilteredResults = (newFilters) => {
    fetchFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSize(data.size);
        setSkip(0);
      }
    });
  };
  const loadMore = () => {
    let toSkip = skip + limit;
    fetchFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...data.data, ...data.data]);
        setSize(data.size);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };
  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className='btn btn-warning mb-5'>
          Load More
        </button>
      )
    );
  };
  useEffect(() => {
    fetchCategories();
    loadFilteredResults(skip, limit, myFilters.filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <div className='mt-12 px-8'>
      <div className='flex justify-between'>
        <div className='w-2/12 mr-2 h-96 bg-white shadow px-4 rounded-lg'>
          <p className='font-semibold mt-4 mb-1 text-purple-800 uppercase text-sm'>
            Filter by Categories
          </p>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, 'category')}
            />
          </ul>

          <p className='font-semibold mt-4 text-purple-800 uppercase text-sm'>
            Filter by Prices
          </p>
          <div className='ml-4'>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, 'price')}
            />
          </div>
        </div>
        <div className='w-10/12'>
          <div className='grid grid-cols-4 gap-3'>
            {filteredResults.map((product, i) => (
              <div className='mb-3' key={i}>
                <Product product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </div>
  );
}
