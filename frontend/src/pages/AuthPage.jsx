import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const AuthPage = ({ isLogin }) => {
    const { login, register, navigate } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            login({ email, password });
        } else {
            if (password !== confirmPassword) {
                alert("Passwords don't match!");
                return;
            }
            register({ email, password });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">{isLogin ? 'Login to your Account' : 'Create an Account'}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div><label className="text-sm font-bold text-gray-600 block">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded mt-1" required /></div>
                    <div><label className="text-sm font-bold text-gray-600 block">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded mt-1" required /></div>
                    {!isLogin && ( <div><label className="text-sm font-bold text-gray-600 block">Confirm Password</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded mt-1" required /></div> )}
                    <div><button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">{isLogin ? 'Login' : 'Register'}</button></div>
                </form>
                <div className="text-center">
                    {isLogin ? ( <p>Don't have an account? <span onClick={() => navigate('register')} className="text-blue-600 hover:underline cursor-pointer">Register here</span></p> ) : ( <p>Already have an account? <span onClick={() => navigate('login')} className="text-blue-600 hover:underline cursor-pointer">Login here</span></p> )}
                </div>
            </div>
        </div>
    );
};
export default AuthPage;
