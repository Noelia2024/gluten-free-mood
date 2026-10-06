import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../views/Home';
import Products from '../views/Products';
import AboutMe from '../views/AboutMe';
import Cart from '../views/Cart';
import NotFound from '../components/NotFound';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Products />} />
        <Route path="sobre-mi" element={<AboutMe />} />
        <Route path="carrito" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;