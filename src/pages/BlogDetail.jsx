import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { jwtDecode } from 'jwt-decode';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { sub } = jwtDecode(token);
      setUserEmail(sub);
    }
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error('Error while fetching blog:', err);
      alert('Oops , Failed to load blog');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Hey , Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/blogs/${id}`);
      alert('Blog deleted successfully!!!');
      navigate('/');
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Oops , Failed to delete blog. You might not be the author.');
    }
  };

  if (!blog) return <p className="text-center text-gray-600 text-lg py-8">Loading...</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-200">
        {blog.title}
      </h2>
      <p className="text-gray-600 italic mb-6 flex items-center gap-2">
        <span>👤 {blog.authorEmail}</span> • <span>🕒 {new Date(blog.createdAt).toLocaleString()}</span>
      </p>
      <div className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
        {blog.content}
      </div>

      {userEmail === blog.authorEmail && (
        <div className="mt-8 flex gap-4">
          <Link
            to={`/edit/${blog.id}`}
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md font-semibold text-sm sm:text-base hover:bg-blue-600 hover:scale-105 transition-all duration-200"
          >
            ✏️ Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold text-sm sm:text-base hover:bg-red-600 hover:scale-105 transition-all duration-200"
          >
            🗑 Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogDetail;
