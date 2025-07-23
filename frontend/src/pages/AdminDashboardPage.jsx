import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Plus, Edit, Trash2, Search } from 'lucide-react'; // Added Edit, Trash2, Search icons

// --- Product Table Row Component (New) ---
const ProductTableRow = ({ product, navigate, t, onDelete, onEdit }) => (
    <tr key={product.id} className="hover:bg-gray-100 transition-colors duration-150 ease-in-out">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full object-cover border border-gray-200" src={product.images[0]} alt={product.name} />
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.description.substring(0, 50)}...</div> {/* Add a snippet of description */}
                </div>
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
            <span className="inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-blue-100 text-blue-800">
                {product.category}
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{product.price.toLocaleString('en-IN')}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button
                onClick={() => onEdit(product.id)}
                className="text-indigo-600 hover:text-indigo-900 mr-3 p-1 rounded-md hover:bg-indigo-50 transition-colors"
                title={t('edit')}
            >
                <Edit className="h-5 w-5" />
            </button>
            <button
                onClick={() => onDelete(product.id)}
                className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                title={t('delete')}
            >
                <Trash2 className="h-5 w-5" />
            </button>
        </td>
    </tr>
);

// --- Admin Dashboard Page Component (Enhanced) ---
const AdminDashboardPage = () => {
    const { products, navigate, t, isLoading, error, fetchProducts, deleteProduct } = useContext(AppContext); // Assuming isLoading, error, fetchProducts, deleteProduct are in context
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        // Fetch products when the component mounts
        // This assumes fetchProducts is a function in your AppContext to load data
        // fetchProducts();
    }, []);

   const handleDeleteProduct = async (productId) => {
    // Ask for user confirmation before deleting
    if (window.confirm(t('confirmDeleteProduct'))) {
        try {
            // Call the deleteProduct function from your AppContext
            await deleteProduct(productId);
            
            // The state will update automatically because deleteProduct
            // calls fetchProducts() after a successful deletion.
            
        } catch (err) {
            // The error alert is already handled inside the context function,
            // but you can add more specific UI feedback here if you want.
            console.error("The component caught an error:", err);
        }
    }
};

    const handleEditProduct = (productId) => {
        navigate(`adminEditProduct/${productId}`); // Navigate to an edit page
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              product.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === '' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    // --- Loading State ---
    if (isLoading) {
        return (
            <div className="container mx-auto p-8 text-center text-gray-600">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p>{t('loadingProducts')}</p>
            </div>
        );
    }

    // --- Error State ---
    if (error) {
        return (
            <div className="container mx-auto p-8 text-center text-red-600">
                <p>{t('errorLoadingProducts')}: {error}</p>
                <button onClick={fetchProducts} className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">
                    {t('tryAgain')}
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-extrabold text-gray-800">{t('adminDashboard')}</h1>
                <button
                    onClick={() => navigate('adminAddProduct')}
                    className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg flex items-center shadow-md hover:bg-blue-700 transition-colors duration-200 ease-in-out"
                >
                    <Plus className="mr-2 h-5 w-5" />
                    {t('addNewProduct')}
                </button>
            </div>

            <div className="mb-6 flex space-x-4">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder={t('searchProducts')}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                {/* Assuming you have a list of categories to populate this dropdown */}
                <select
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">{t('allCategories')}</option>
                    {/* Map through unique categories from your products or fetch them */}
                    {Array.from(new Set(products.map(p => p.category))).map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                {/* --- Empty State --- */}
                {filteredProducts.length === 0 && !isLoading && !error ? (
                    <div className="p-8 text-center text-gray-500">
                        <p className="text-lg mb-2">{t('noProductsFound')}</p>
                        <p>{t('tryAdjustingFilters')}</p>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    {t('product')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    {t('category')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    {t('price')}
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    {t('actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.map(product => (
                                <ProductTableRow
                                    key={product.id}
                                    product={product}
                                    navigate={navigate}
                                    t={t}
                                    onDelete={handleDeleteProduct}
                                    onEdit={handleEditProduct}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboardPage;