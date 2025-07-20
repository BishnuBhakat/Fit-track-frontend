import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api'; 

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', {
        username: form.username,
        password: form.password,
      });
      if (response.data === 'Login successful') {
        alert('Login successful!');
        localStorage.setItem('username', form.username);
        localStorage.setItem('isAuthenticated', 'true'); // <-- Add this line
        navigate('/dashboard');
      } else {
        alert('Invalid username or password');
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-80">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-3 rounded transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <span className="text-blue-600 hover:underline cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
