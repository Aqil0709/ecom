import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { products, navigate } = useContext(AppContext);
  const featuredProducts = products.slice(0, 4);
  const popularProducts = products.slice(4, 8);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-600 text-white"><div className="container mx-auto px-4 py-16 text-center"><h2 className="text-4xl md:text-5xl font-bold mb-4">Biggest Sale of the Year!</h2><p className="text-lg md:text-xl mb-8">Up to 70% off on your favorite brands. Don't miss out!</p><button onClick={() => navigate('products')} className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors">Shop Now</button></div></div>
      <div className="container mx-auto px-4 py-12"><h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Products</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}</div></div>
      <div className="bg-white"><div className="container mx-auto px-4 py-12"><h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Popular Right Now</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{popularProducts.map(p => <ProductCard key={p.id} product={p} />)}</div></div></div>
    </div>
  );
};
export default HomePage;
