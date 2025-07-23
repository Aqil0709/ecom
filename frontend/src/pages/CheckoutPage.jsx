import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CheckoutPage = () => {
    const { placeOrder, cart } = useContext(AppContext);
    const [formData, setFormData] = useState({ name: '', address: '', city: '', zip: '', country: '', card: '', expiry: '', cvv: '' });
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 40.00;
    const total = subtotal + shipping;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        for (const key in formData) { if (formData[key] === '') { alert(`Please fill out the ${key} field.`); return; } }
        placeOrder();
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-6">Shipping & Payment Information</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div><label className="block text-sm font-medium text-gray-700">Full Name</label><input type="text" name="name" onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required /></div>
                            <div><label className="block text-sm font-medium text-gray-700">Address</label><input type="text" name="address" onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-gray-700">City</label><input type="text" name="city" onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ZIP Code</label><input type="text" name="zip" onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required /></div>
                            </div>
                            <div><label className="block text-sm font-medium text-gray-700">Card Number</label><input type="text" name="card" placeholder="**** **** **** ****" onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-gray-700">Expiry (MM/YY)</label><input type="text" name="expiry" placeholder="MM/YY" onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required /></div>
                                <div><label className="block text-sm font-medium text-gray-700">CVV</label><input type="text" name="cvv" placeholder="***" onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required /></div>
                            </div>
                            <button type="submit" className="w-full mt-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors">Place Order</button>
                        </form>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md h-fit">
                        <h3 className="text-xl font-bold mb-6">Your Order</h3>
                        <div className="space-y-4">{cart.map(item => (<div key={item.id} className="flex justify-between items-center"><div><p className="font-semibold">{item.name} <span className="text-sm text-gray-500">x{item.quantity}</span></p></div><p>₹{(item.price * item.quantity).toFixed(2)}</p></div>))}</div>
                        <div className="border-t mt-4 pt-4 space-y-2">
                            <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Shipping</span><span>₹{shipping.toFixed(2)}</span></div>
                            <div className="flex justify-between font-bold text-xl mt-2"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CheckoutPage;
