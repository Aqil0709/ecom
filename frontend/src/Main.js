import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage'; // <-- IMPORT NEW PAGE
import AdminDashboardPage from './pages/AdminDashboardPage'; // <-- IMPORT NEW
import AdminAddProductPage from './pages/AdminAddProductPage';

const Main = () => {
  const { currentPage } = useContext(AppContext);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'productDetail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'login':
        return <AuthPage isLogin={true} />;
      case 'register':
        return <AuthPage isLogin={false} />;
      case 'profile': // <-- ADD NEW ROUTE
        return <ProfilePage />;
        case 'adminDashboard': return <AdminDashboardPage />; // <-- ADD NEW
      case 'adminAddProduct': return <AdminAddProductPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </>
  );
};
export default Main;