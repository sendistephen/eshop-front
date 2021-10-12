import { isAuthenticated } from 'api/auth';
import { deleteProduct, getProducts } from 'api/product';
import { Layout } from 'components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <Layout
      title='Manage Products'
      description='Perform CRUD operations'
      className='container'
    >
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <p className='lead'>Total ({products.length}) products</p>
            <ul className='list-group'>
              {products.map((product, pIndex) => (
                <li
                  key={pIndex}
                  className='list-group-item d-flex justify-content-between align-items-center'
                >
                  <strong>{product.name}</strong>
                  <div className='div d-flex justify-content-between align-items-center'>
                    <Link to={`/admin/product/update/${product._id}`}>
                      <span className='btn btn-sm btn-warning'>Update</span>
                    </Link>
                    <span
                      onClick={() => removeProduct(product._id)}
                      className='btn btn-sm btn-danger ml-2'
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
    </Layout>
  );
};
export default ManageProducts;
