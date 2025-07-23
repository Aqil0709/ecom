import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

// You can keep this Row component in the same file or move it to its own file
const ProductTableRow = ({ product, onDelete, onEdit }) => {
    const getStockStatus = (stock) => {
        if (stock === 0) return { text: 'Out of Stock', className: 'bg-red-100 text-red-800' };
        if (stock < 10) return { text: `Low Stock (${stock})`, className: 'bg-yellow-100 text-yellow-800' };
        return { text: `In Stock (${stock})`, className: 'bg-green-100 text-green-800' };
    };
    const stockStatus = getStockStatus(product.stockQuantity);

    return (
        <tr key={product.id} className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full object-cover border" src={product.images[0]} alt={product.name} />
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.category}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{product.price.toLocaleString('en-IN')}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${stockStatus.className}`}>
                    {stockStatus.text}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => onEdit(product.id)} className="text-indigo-600 hover:text-indigo-900 mr-3 p-1"><Edit className="h-5 w-5" /></button>
                <button onClick={() => onDelete(product.id)} className="text-red-600 hover:text-red-900 p-1"><Trash2 className="h-5 w-5" /></button>
            </td>
        </tr>
    );
};


const ProductManagementPage = () => {
    const { products, fetchProducts, deleteProduct, isLoading, error } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(productId);
        }
    };

    const handleEdit = (productId) => {
        // You would navigate to an edit page, e.g., navigate(`/admin/products/edit/${productId}`)
        alert(`Editing product ID: ${productId}`);
    };
    
    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading && products.length === 0) return <div className="p-8 text-center">Loading products...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-extrabold text-gray-800">Product Management</h1>
                <button className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg flex items-center shadow-md hover:bg-blue-700">
                    <Plus className="mr-2 h-5 w-5" />
                    Add New Product
                </button>
            </div>

            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search by name or category..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-x-auto border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stock Status</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredProducts.map(product => (
                            <ProductTableRow key={product.id} product={product} onDelete={handleDelete} onEdit={handleEdit} />
                        ))}
                    </tbody>
                </table>
                 {filteredProducts.length === 0 && <p className="p-8 text-center text-gray-500">No products found.</p>}
            </div>
        </div>
    );
};

export default ProductManagementPage;