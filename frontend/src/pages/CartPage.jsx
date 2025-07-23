import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const { cart, navigate, updateQuantity, removeFromCart, currentUser, t } = useContext(AppContext);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 40.00;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (currentUser) {
      navigate('checkout');
    } else {
      navigate('login');
    }
  };

  // ✨ NEW: Handler for decreasing quantity or removing item
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('cartEmptyTitle')}</h2>
        <p className="text-gray-600 mb-8">{t('cartEmptySubtitle')}</p>
        <button onClick={() => navigate('home')} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">{t('startShopping')}</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{t('shoppingCart')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            {cart.map(item => (
              <div key={item.id} className="flex items-center border-b py-4 last:border-b-0">
                <img src={item.image || `https://placehold.co/200x200/cccccc/ffffff?text=${item.name}`} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                <div className="flex-grow"><h3 className="text-lg font-semibold">{item.name}</h3><p className="text-gray-500">₹{Number(item.price).toFixed(2)}</p></div>
                <div className="flex items-center mx-4">
                  {/* ✨ UPDATED: Use the new handler */}
                  <button onClick={() => handleDecrease(item)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"><Minus className="h-4 w-4" /></button>
                  <span className="w-12 text-center font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"><Plus className="h-4 w-4" /></button>
                </div>
                <p className="font-bold w-24 text-right">₹{(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700"><Trash2 className="h-5 w-5" /></button>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h3 className="text-xl font-bold border-b pb-4 mb-4">{t('orderSummary')}</h3>
            <div className="space-y-2 mb-4"><div className="flex justify-between"><span>{t('subtotal')}</span><span>₹{subtotal.toFixed(2)}</span></div><div className="flex justify-between"><span>{t('shipping')}</span><span>₹{shipping.toFixed(2)}</span></div></div>
            <div className="flex justify-between font-bold text-xl border-t pt-4"><span>{t('total')}</span><span>₹{total.toFixed(2)}</span></div>
            <button onClick={handleCheckout} className="w-full mt-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors">{t('proceedToCheckout')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;