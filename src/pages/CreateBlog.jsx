import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { isLoggedIn } from '../utils/auth';

function CreateBlog() {
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      alert('You must be logged in to create a blog');
      navigate('/login');
      return;
    }

    try {
      await api.post('/blogs', form);
      alert('Blog created successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error creating blog:', err);
      alert('Failed to create blog');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200 tracking-tight hover:text-blue-600 transition-colors duration-200">
        Create a New Blog , Post it here!
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
        <textarea
          name="content"
          placeholder="Content"
          rows="10"
          value={form.content}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y transition-all duration-200"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold text-sm sm:text-base hover:bg-blue-600 hover:scale-105 transition-all duration-200 self-start"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
