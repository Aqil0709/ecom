import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import StarRating from '../components/StarRating';
import Price from '../components/Price';
import { ShoppingCart } from 'lucide-react';

const ProductDetailPage = () => {
  const { selectedProduct, addToCart, t } = useContext(AppContext);

  if (!selectedProduct) return <p>{t('productNotFound')}</p>;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    e.currentTarget.firstChild.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Product Image */}
        <div 
          className="relative w-full h-[400px] md:h-[500px] border rounded-lg overflow-hidden group cursor-zoom-in"
          onMouseMove={handleMouseMove}
        >
          <img 
            src={selectedProduct.image} 
            alt={selectedProduct.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-150"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x600/cccccc/ffffff?text=Image+Not+Found'; }}
          />
        </div>

        {/* Product Details */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
          <p className="text-lg text-gray-600 mb-4">{selectedProduct.category}</p>
          <div className="mb-4">
            <StarRating rating={selectedProduct.rating} reviews={selectedProduct.reviews} />
          </div>
          <div className="mb-6">
            <Price amount={selectedProduct.price} />
          </div>
          <p className="text-gray-700 mb-8 leading-relaxed">{selectedProduct.description}</p>
          <button 
            onClick={() => addToCart(selectedProduct)} 
            className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <ShoppingCart className="mr-2 h-6 w-6" /> {t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
