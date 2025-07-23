import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { PlusCircle } from 'lucide-react';

const ProfilePage = () => {
    const { currentUser, addresses, updateUserProfile, addAddress, t, navigate } = useContext(AppContext);
    const [isEditingName, setIsEditingName] = useState(false);
    const [name, setName] = useState(currentUser ? currentUser.name : '');
    const [showAddressForm, setShowAddressForm] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate('login');
        } else {
            setName(currentUser.name);
        }
    }, [currentUser, navigate]);

    const handleNameSubmit = (e) => {
        e.preventDefault();
        updateUserProfile(name);
        setIsEditingName(false);
    };
    
    if (!currentUser) {
        return null; // Or a loading spinner
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">{t('manageProfile')}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Profile Info */}
                    <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
                        <h2 className="text-xl font-bold mb-4">{t('personalInformation')}</h2>
                        {isEditingName ? (
                            <form onSubmit={handleNameSubmit}>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
                                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">{t('saveChanges')}</button>
                            </form>
                        ) : (
                            <div className="space-y-2">
                                <p><span className="font-semibold">{t('fullName')}:</span> {currentUser.name}</p>
                                <p><span className="font-semibold">{t('email')}:</span> {currentUser.email}</p>
                                <button onClick={() => setIsEditingName(true)} className="text-blue-600 hover:underline text-sm">Edit</button>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Addresses */}
                    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{t('manageAddresses')}</h2>
                            <button onClick={() => setShowAddressForm(true)} className="flex items-center text-blue-600 font-semibold hover:text-blue-800">
                                <PlusCircle className="mr-2 h-5 w-5" />
                                {t('addNewAddress')}
                            </button>
                        </div>
                        
                        {showAddressForm && <AddressForm closeForm={() => setShowAddressForm(false)} />}

                        <div className="space-y-4 mt-6">
                            {addresses.length > 0 ? (
                                addresses.map(addr => (
                                    <div key={addr.id} className="border p-4 rounded-lg">
                                        <div className="flex justify-between">
                                            <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">{addr.address_type}</span>
                                        </div>
                                        <p className="font-bold mt-2">{addr.name} <span className="font-normal ml-4">{addr.mobile}</span></p>
                                        <p className="text-gray-600">{addr.address}, {addr.locality}, {addr.city}, {addr.state} - <span className="font-semibold">{addr.pincode}</span></p>
                                    </div>
                                ))
                            ) : (
                                !showAddressForm && <p className="text-gray-500 text-center py-8">{t('noAddressesFound')}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AddressForm = ({ closeForm }) => {
    const { addAddress, t } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: '', mobile: '', pincode: '', locality: '',
        address: '', city: '', state: '', address_type: 'Home'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addAddress(formData);
        closeForm();
    };

    return (
        <div className="border-t pt-6 mt-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder={t('fullName')} className="p-2 border rounded w-full md:col-span-2" required />
                <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder={t('mobileNumber')} className="p-2 border rounded" required />
                <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder={t('pincode')} className="p-2 border rounded" required />
                <input name="locality" value={formData.locality} onChange={handleChange} placeholder={t('locality')} className="p-2 border rounded w-full md:col-span-2" />
                <textarea name="address" value={formData.address} onChange={handleChange} placeholder={t('addressArea')} className="p-2 border rounded w-full md:col-span-2" rows="3" required></textarea>
                <input name="city" value={formData.city} onChange={handleChange} placeholder={t('city')} className="p-2 border rounded" required />
                <input name="state" value={formData.state} onChange={handleChange} placeholder={t('state')} className="p-2 border rounded" required />
                
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('addressType')}</label>
                    <div className="flex items-center space-x-4">
                        <label><input type="radio" name="address_type" value="Home" checked={formData.address_type === 'Home'} onChange={handleChange} className="mr-1"/> {t('home')}</label>
                        <label><input type="radio" name="address_type" value="Work" checked={formData.address_type === 'Work'} onChange={handleChange} className="mr-1"/> {t('work')}</label>
                    </div>
                </div>

                <div className="md:col-span-2 flex justify-end space-x-3">
                    <button type="button" onClick={closeForm} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300">{t('cancel')}</button>
                    <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">{t('save')}</button>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;
