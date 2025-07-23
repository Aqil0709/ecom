import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import StarRating from './StarRating';
import Price from './Price';

const ProductCard = ({ product }) => {
  const { navigate, addToCart } = useContext(AppContext);

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group">
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate('productDetail', product)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found';
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="text-lg font-semibold text-gray-800 truncate cursor-pointer"
          onClick={() => navigate('productDetail', product)}
        >
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="my-2">
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>
        <div className="flex-grow" />
        <div className="flex justify-between items-center mt-4">
          <Price amount={product.price} />
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
