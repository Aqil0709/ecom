import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, ShoppingCart, User, Menu, X, Globe, ShieldCheck } from 'lucide-react';

const Header = () => {
  const { navigate, cart, currentUser, logout, setSearchTerm, t, setLanguage, language } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 onClick={() => navigate('home')} className="text-2xl font-bold text-blue-600 cursor-pointer">Aaisaheb Vastram</h1>
          </div>
          <div className="hidden lg:flex flex-grow max-w-xl mx-8">
            <div className="relative w-full">
              <input type="text" placeholder={t('searchPlaceholder')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && navigate('products')} />
              <button onClick={() => navigate('products')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"><Search className="h-5 w-5" /></button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative group hidden md:block">
                <button className="flex items-center p-2 rounded-md">
                    <Globe className="h-5 w-5 text-gray-700"/>
                </button>
                <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <a href="#" onClick={(e) => {e.preventDefault(); handleLanguageChange('en')}} className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${language === 'en' ? 'font-bold' : ''}`}>English</a>
                    <a href="#" onClick={(e) => {e.preventDefault(); handleLanguageChange('mr')}} className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${language === 'mr' ? 'font-bold' : ''}`}>मराठी</a>
                </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              {currentUser && currentUser.role === 'admin' && (
                  <a href="#" onClick={(e) => {e.preventDefault(); navigate('adminDashboard')}} className="flex items-center text-green-600 font-semibold">
                      <ShieldCheck className="h-5 w-5 mr-1"/>
                      {t('adminPanel')}
                  </a>
              )}
              {currentUser ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1"><User className="h-6 w-6 text-gray-700" /><span>{currentUser.name}</span></button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <a href="#" onClick={(e) => {e.preventDefault(); navigate('profile')}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('profile')}</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('orders')}</a>
                    <a href="#" onClick={(e) => {e.preventDefault(); logout();}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('logout')}</a>
                  </div>
                </div>
              ) : ( <button onClick={() => navigate('login')} className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t('login')}</button> )}
              <div onClick={() => navigate('cart')} className="relative cursor-pointer">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cartItemCount > 0 && ( <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span> )}
              </div>
            </nav>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <nav className="flex flex-col space-y-2">
              {currentUser ? (
                <>
                  <span className="px-4 py-2 text-gray-700">{t('hi')}, {currentUser.name}</span>
                  <a href="#" onClick={(e) => {e.preventDefault(); navigate('profile'); setIsMenuOpen(false);}} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">{t('profile')}</a>
                  <a href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">{t('orders')}</a>
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md">{t('logout')}</button>
                </>
              ) : ( <button onClick={() => { navigate('login'); setIsMenuOpen(false); }} className="px-4 py-2 text-white bg-blue-600 rounded-md">{t('login')}</button> )}
              <button onClick={() => { navigate('cart'); setIsMenuOpen(false); }} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" /> {t('cart')} ({cartItemCount})
              </button>
               <div className="px-4 py-2">
                    <span className="text-sm font-semibold text-gray-600">Language:</span>
                    <div className="mt-2 flex space-x-2">
                        <button onClick={() => handleLanguageChange('en')} className={`px-3 py-1 text-sm rounded-md ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>English</button>
                        <button onClick={() => handleLanguageChange('mr')} className={`px-3 py-1 text-sm rounded-md ${language === 'mr' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>मराठी</button>
                    </div>
                </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;