import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        <Outlet /> {/* Aquí se renderiza cada vista según la ruta */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;