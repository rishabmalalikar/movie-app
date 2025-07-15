import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => 
{
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = e => 
        {
            setFormData({ ...formData, [e.target.name]: e.target.value });
            setError('');
            setSuccess('');
        };

    const handleSubmit = async e => 
    {   
        e.preventDefault();

        // Simple client-side validation
        if (!formData.email || !formData.password) 
            {
                setError('All fields are required');
                return;
            }

        try 
        {
            const res = await axios.post('http://localhost:3000/login', formData);
            if (res.data.status === 'success') 
                {
                    setSuccess(res.data.message);
                } 
            else
                {
                    setError(res.data.message);
                }
        } 

        catch (err) 
        {
            setError('Server error or network issue');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded text-black"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 mb-4 border rounded text-black"
                value={formData.password}
                onChange={handleChange}
            />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-600">Login</button>
        </form>
        </div>
    );
};

export default LoginForm;
