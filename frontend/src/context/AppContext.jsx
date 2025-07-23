import React, { useState, createContext, useEffect } from 'react';
import { locales } from '../translations/locales';
import { mockProducts } from '../data/mockProducts';

export const AppContext = createContext();

const API_BASE_URL = 'http://localhost:5001/api'; 

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('en');

  // --- NEW: Global loading and error states ---
  const [isLoading, setIsLoading] = useState(true); // Start true for initial fetch
  const [error, setError] = useState(null);

 const fetchProducts = async () => {
  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    let dbProducts = [];

    if (response.ok) {
      dbProducts = await response.json();
    } else {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const combined = [...mockProducts, ...dbProducts];
    setProducts(combined);

  } catch (err) {
    console.error("Error fetching products:", err);
    setError(err.message);
    setProducts(mockProducts); // fallback to mock products if DB fails
  } finally {
    setIsLoading(false);
  }
};

  // Fetch all products on initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Check for a logged-in user in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('shopkartUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setCurrentUser(userData);
    }
  }, []);

  // Fetch user-specific data (cart, addresses) when a user logs in
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const cartResponse = await fetch(`${API_BASE_URL}/cart/${currentUser.id}`);
          if (cartResponse.ok) setCart(await cartResponse.json());
        } catch (error) { console.error('Error fetching cart:', error); }

        try {
          const addressResponse = await fetch(`${API_BASE_URL}/profile/${currentUser.id}/addresses`);
          if (addressResponse.ok) setAddresses(await addressResponse.json());
        } catch (error) { console.error('Error fetching addresses:', error); }
      } else {
        setCart([]);
        setAddresses([]);
      }
    };
    fetchUserData();
  }, [currentUser]);


  const t = (key) => locales[language][key] || key;

  const navigate = (page, product = null) => {
    setCurrentPage(page);
    if (product) setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      await login({ email: userData.email, password: userData.password });
    } catch (error) {
      console.error('Registration failed:', error);
      alert('An error occurred during registration.');
    }
  };
  
  const login = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      const user = { id: data.id, name: data.name, email: data.email, role: data.role };
      setCurrentUser(user);
      localStorage.setItem('shopkartUser', JSON.stringify(user));
      navigate('home');
    } catch (error) {
      console.error('Login failed:', error);
      alert('An error occurred during login.');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('shopkartUser');
    setCart([]);
    setAddresses([]);
    navigate('home');
  };
  
  const addToCart = async (productToAdd) => {
    if (!currentUser) {
      navigate('login');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${currentUser.id}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productToAdd.id, name: productToAdd.name, price: productToAdd.price, images: productToAdd.images }),
      });
      const updatedCart = await response.json();
      if (response.ok) setCart(updatedCart);
      else alert(updatedCart.message);
    } catch (error) { console.error('Failed to add to cart:', error); }
  };

  const updateQuantity = async (productId, newQuantity) => {
      if (!currentUser) return;
    if (newQuantity <= 0) {
        await removeFromCart(productId);
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/cart/${currentUser.id}/update/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: newQuantity }),
        });
        const updatedCart = await response.json();
        if (response.ok) setCart(updatedCart);
        else alert(updatedCart.message);
    } catch (error) { console.error('Failed to update quantity:', error); }
  };

  const removeFromCart = async (productId) => {
    if (!currentUser) return;
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${currentUser.id}/remove/${productId}`, {
        method: 'DELETE',
      });
      const updatedCart = await response.json();
      if (response.ok) setCart(updatedCart);
      else alert(updatedCart.message);
    } catch (error) { console.error('Failed to remove from cart:', error); }
  };

  const placeOrder = () => {
    alert(t('orderPlacedSuccess'));
    setCart([]); 
    navigate('home');
  };

  const updateUserProfile = async (newName) => {
    if (!currentUser) return;
    try {
        const response = await fetch(`${API_BASE_URL}/profile/${currentUser.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName }),
        });
        const updatedUser = await response.json();
        if (response.ok) {
            setCurrentUser(prev => ({...prev, ...updatedUser}));
            localStorage.setItem('shopkartUser', JSON.stringify({...currentUser, ...updatedUser}));
            alert('Profile updated successfully!');
        } else {
            alert(updatedUser.message);
        }
    } catch (error) { console.error('Failed to update profile:', error); }
  };

  const addAddress = async (addressData) => {
    if (!currentUser) return;
    try {
        const response = await fetch(`${API_BASE_URL}/profile/${currentUser.id}/addresses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addressData),
        });
        const updatedAddresses = await response.json();
        if (response.ok) {
            setAddresses(updatedAddresses);
        } else {
            alert(updatedAddresses.message);
        }
    } catch (error) { console.error('Failed to add address:', error); }
  };
  
  // --- UPDATED: For file upload (FormData) ---
  const addProduct = async (formData) => {
    if (!currentUser || currentUser.role !== 'admin') {
      alert("You are not authorized to perform this action.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/products/add/${currentUser.id}`, {
        method: 'POST',
        // DO NOT set 'Content-Type'. The browser will do it for FormData.
        body: formData,
      });

      const newProductData = await response.json();
      if(response.ok) {
        await fetchProducts();
        alert(t('productAddedSuccess'));
        navigate('adminDashboard');
      } else {
        alert(newProductData.message);
      }
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product: " + error.message);
    }
  };

 const deleteProduct = async (productId) => {
   if (!currentUser || currentUser.role !== 'admin') {
     alert("You are not authorized to delete products.");
     throw new Error("Unauthorized");
   }

   try {
     const response = await fetch(`${API_BASE_URL}/products/delete/${currentUser.id}/${productId}`, {
       method: 'DELETE',
     });

     if (!response.ok) {
       const errorData = await response.json().catch(() => ({ message: response.statusText }));
       throw new Error(errorData.message || `Failed to delete product: HTTP status ${response.status}`);
     }
     
     await fetchProducts(); 
     alert(t('productDeletedSuccess'));

   } catch (error) {
     console.error('Error deleting product:', error);
     alert(`Error deleting product: ${error.message}`);
     throw error;
   }
 };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const value = {
    products, cart, currentUser, addresses, currentPage, selectedProduct, searchTerm, filteredProducts, language, t,
    // Add new global states to the context value
    isLoading, error,
    setLanguage, navigate, login, addProduct, register, logout, addToCart, updateQuantity, removeFromCart, placeOrder, updateUserProfile, addAddress, setSearchTerm,
    deleteProduct,
    fetchProducts
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};