import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const OrderManagementPage = () => {
    const { orders, fetchOrders, updateOrderStatus, isLoading, error } = useContext(AppContext);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleStatusChange = (orderId, newStatus) => {
        if (newStatus) {
            updateOrderStatus(orderId, newStatus);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'border-yellow-500 text-yellow-700';
            case 'Shipped': return 'border-blue-500 text-blue-700';
            case 'Delivered': return 'border-green-500 text-green-700';
            case 'Canceled': return 'border-red-500 text-red-700';
            default: return 'border-gray-300 text-gray-700';
        }
    };
    
    if (isLoading && orders.length === 0) return <div className="p-8 text-center">Loading orders...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Order Management</h1>
            
            <div className="bg-white shadow-lg rounded-lg overflow-x-auto border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">#{order.id.slice(-6).toUpperCase()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString('en-IN')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <select 
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className={`p-1.5 border rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 bg-transparent ${getStatusColor(order.status)}`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Canceled">Canceled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && <p className="p-8 text-center text-gray-500">No orders found.</p>}
            </div>
        </div>
    );
};

export default OrderManagementPage;