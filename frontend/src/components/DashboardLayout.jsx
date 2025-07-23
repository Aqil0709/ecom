// src/components/DashboardLayout.js
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Package, ShoppingCart, BarChart2 } from 'lucide-react'; // Icons for navigation

const DashboardLayout = () => {
    const navLinkClasses = ({ isActive }) =>
        `flex items-center px-4 py-2 mt-2 text-gray-700 rounded-lg transition-colors duration-200 ` +
        (isActive ? 'bg-blue-200 text-blue-800' : 'hover:bg-gray-200');

    return (
        <div className="flex h-screen bg-gray-100">
            {/* --- Sidebar --- */}
            <div className="flex flex-col w-64 bg-white border-r">
                <div className="flex items-center justify-center h-16 border-b">
                    <span className="text-xl font-bold text-blue-600">Admin Panel</span>
                </div>
                <nav className="flex-grow p-4">
                    <NavLink to="/admin/products" className={navLinkClasses}>
                        <Package className="h-5 w-5 mr-3" />
                        Products
                    </NavLink>
                    <NavLink to="/admin/orders" className={navLinkClasses}>
                        <ShoppingCart className="h-5 w-5 mr-3" />
                        Orders
                    </NavLink>
                    {/* Add more links like analytics later */}
                    {/* <NavLink to="/admin/analytics" className={navLinkClasses}>
                        <BarChart2 className="h-5 w-5 mr-3" />
                        Analytics
                    </NavLink> */}
                </nav>
            </div>

            {/* --- Main Content --- */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                <Outlet /> {/* Your pages will be rendered here */}
            </main>
        </div>
    );
};

export default DashboardLayout;