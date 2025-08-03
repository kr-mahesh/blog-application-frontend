import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const fetchBlogs = async (page) => {
    try {
      const res = await api.get(`/blogs?page=${page}&size=6`);
      setBlogs(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl bg-gray-50 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200 tracking-tight hover:text-blue-600 transition-colors duration-200">
        📝 Recent Blogs
      </h2>

      {blogs.length === 0 && <p className="text-gray-600 text-center text-lg">No blogs available.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-5 border border-gray-100"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
              {blog.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {blog.content}
            </p>
            <Link
              to={`/blogs/${blog.id}`}
              className="inline-block text-blue-500 font-semibold hover:text-blue-700 hover:underline transition-all duration-200"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-all duration-200 ${
              page === i
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BlogList;