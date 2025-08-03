import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Signup successful!! You can login now.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Oops , Signup failed: ' + (err.response?.data || 'Unknown error'));
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-md bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200 tracking-tight hover:text-blue-600 transition-colors duration-200">
        Signup
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold text-sm sm:text-base hover:bg-blue-600 hover:scale-105 transition-all duration-200 self-start"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;