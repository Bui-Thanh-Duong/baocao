import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProductList from '../containers/product/product';
import ProductDetail from '../containers/product/deltaproduct';
import Productbycategory from '../containers/product/productbycategory';
import Login from '../containers/Header/login';
import UserInfo from '../containers/user/userInfor';
import Slider from '../containers/Header/menuBanner';
import Registry from '../containers/registry/registry';

const HomePage = () => {
  return (
    // React.Fragment
    <> 
      <Slider />
      <ProductList />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "deltaproduct/:id",
        element: <ProductDetail />
      },
      {
        path: "productbycategory/:id",
        element: <Productbycategory />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "userinfor/:username",
        element: <UserInfo />
      },
      {
        path: "registry",
        element: <Registry />
      }
    ]
  }
]);
