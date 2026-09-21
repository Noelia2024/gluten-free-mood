import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../views/Home';
import DetailProduct from '../views/DetailProduct';
import Cart from '../views/Cart';
import NotFound from '../components/NotFound';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="producto/:id" element={<DetailProduct />} />
        <Route path="carrito" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;