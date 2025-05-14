import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await api.post('/users/register', {
        username,
        email,
        password,
      });
      alert(res.data); 
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please check your input or try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-80">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h1>
        <input
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full py-3 rounded transition duration-300"
        >
          Register
        </button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
