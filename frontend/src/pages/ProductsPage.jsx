import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const { filteredProducts } = useContext(AppContext);
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">All Products</h2>
      {filteredProducts.length > 0 ? ( <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">{filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}</div> ) : ( <p className="text-center text-gray-500 text-lg py-12">No products found matching your search.</p> )}
    </div>
  );
};
export default ProductsPage;