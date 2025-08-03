import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`);
      setForm({
        title: res.data.title,
        content: res.data.content
      });
    } catch (err) {
      console.error('Failed to load blog:', err);
      alert('Oops , Error loading blog. You might not be the author.');
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/blogs/${id}`, form);
      alert('Hurrey , Blog updated successfully!');
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed. You might not be the author.');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200 tracking-tight hover:text-blue-600 transition-colors duration-200">
        Edit Blog
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="Title"
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
        <textarea
          name="content"
          rows="10"
          value={form.content}
          onChange={handleChange}
          required
          placeholder="Content"
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y transition-all duration-200"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold text-sm sm:text-base hover:bg-blue-600 hover:scale-105 transition-all duration-200 self-start"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
