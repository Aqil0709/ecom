import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const AdminAddProductPage = () => {
    const { addProduct, t } = useContext(AppContext);

    // 1. Separate state for file and text inputs for easier handling
    const [textData, setTextData] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
    });
    const [productImage, setProductImage] = useState(null);
    const [error, setError] = useState('');

    // Handler for text input fields
    const handleChange = (e) => {
        setTextData({ ...textData, [e.target.name]: e.target.value });
    };

    // 2. New handler specifically for the file input
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 2000000) { // 2MB limit
            setError('File is too large. Maximum size is 2MB.');
            setProductImage(null);
        } else {
            setProductImage(file);
            setError('');
        }
    };

    // 3. Updated submit handler to use FormData
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!productImage) {
            setError('Product image is required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', textData.name);
        formData.append('category', textData.category);
        formData.append('price', textData.price);
        formData.append('description', textData.description);
        formData.append('productImage', productImage); // Append the file

        // The addProduct function in your context is already set up to handle FormData
        addProduct(formData);
    };

    return (
        <div className="container mx-auto p-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">{t('addNewProduct')}</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                {/* Text Inputs */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('productName')}</label>
                    <input type="text" name="name" value={textData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('category')}</label>
                    <input type="text" name="category" value={textData.category} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('price')}</label>
                    <input type="number" name="price" value={textData.price} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('description')}</label>
                    <textarea name="description" value={textData.description} onChange={handleChange} rows="4" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required></textarea>
                </div>
                
                {/* 4. File input replaces the text input for images */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('productImage')}</label>
                    <input 
                        type="file" 
                        name="productImage" 
                        onChange={handleFileChange} 
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                        required 
                    />
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 2MB.</p>
                </div>

                {/* Display any file-related errors */}
                {error && <p className="text-sm text-red-600">{error}</p>}

                <div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        {t('addNewProduct')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminAddProductPage;