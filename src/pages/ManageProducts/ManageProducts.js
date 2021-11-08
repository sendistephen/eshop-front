import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAuthenticated } from 'api/auth';
import { deleteProduct, getProducts } from 'api/product';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const {
    foundUser: { _id },
    token,
  } = isAuthenticated();

  const fetchProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const removeProduct = (productId) => {
    deleteProduct(productId, _id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // load products again
        fetchProducts();
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className='px-8 '>
        <div className='py-4 px-4 text-2xl font-bold bg-white rounded'>
          <h1>Manage Products</h1>
        </div>
        <div className='bg-white px-4 py-4 mt-4'>
          <div className='col-md-12'>
            <p className='text-pink-600'>Total ({products.length}) products</p>
            <ul className='my-2'>
              {products.map((product, pIndex) => (
                <li
                  key={pIndex}
                  className='py-2 px-4 mb-4 bg-purple-200 flex justify-between items-center shadow-sm text-sm rounded-sm'
                >
                  <p>{product.name}</p>

                  <div className='flex justify-between items-center'>
                    <Link to={`/admin/product/update/${product._id}`}>
                      <span className='mr-2 py-1 bg-red-400 text-xs px-1 shadow rounded-sm text-red-100 hover:bg-red-500'>
                        Update
                      </span>
                    </Link>
                    <span
                      onClick={() => removeProduct(product._id)}
                      className='py-1 bg-blue-400 text-xs px-1 shadow rounded-sm text-blue-100 hover:bg-blue-500 cursor-pointer'
                    >
                      Trash
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageProducts;
