import { AdminRoute, PrivateRoute } from 'components';
import Shop from 'components/shop';
import {
  AdminDashboard,
  CreateCategory,
  CreateProduct,
  Dashboard,
  ProductDetails,
  Home,
  Signin,
  Signup,
  Cart,
  Orders,
  Profile,
  ManageProducts,
  UpdateProduct,
} from 'pages';

import { Switch, Route } from 'react-router-dom';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/shop' component={Shop} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/signin' component={Signin} />
      <PrivateRoute exact path='/user/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/admin/dashboard' component={AdminDashboard} />
      <Route exact path='/products/:productId' component={ProductDetails} />
      <Route exact path='/cart' component={Cart} />

      <AdminRoute
        exact
        path='/admin/category/create'
        component={CreateCategory}
      />
      <AdminRoute
        exact
        path='/admin/product/create'
        component={CreateProduct}
      />
      <AdminRoute exact path='/admin/products' component={ManageProducts} />
      <AdminRoute
        exact
        path='/admin/product/update/:productId'
        component={UpdateProduct}
      />
      <AdminRoute exact path='/admin/orders' component={Orders} />
      <PrivateRoute exact path='/profile/:userId' component={Profile} />
    </Switch>
  );
};
