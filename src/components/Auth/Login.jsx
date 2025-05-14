import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api'; 

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/users/login', {
        username,
        password,
      });
      if (response.data === 'Login successful') {
        alert('Login successful!');
        localStorage.setItem('username', username);
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
        <input
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-3 rounded transition duration-300"
        >
          Login
        </button>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <span className="text-blue-600 hover:underline cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
}
