import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isLoggedIn, logout } from '../utils/auth';

function Navbar() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAuth(isLoggedIn());
  }, []);

  const handleLogout = () => {
    logout();
    setAuth(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <div className="flex items-center gap-4 sm:gap-6">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight hover:text-blue-400 transition-colors duration-200">
          Blog Application
        </h1>
        <Link to="/" className="text-sm sm:text-base font-medium px-3 py-2 rounded-md hover:bg-gray-700 hover:text-blue-300 transition-all duration-200">
          Home
        </Link>
        {auth && (
          <Link to="/create" className="text-sm sm:text-base font-medium px-3 py-2 rounded-md hover:bg-gray-700 hover:text-blue-300 transition-all duration-200">
            Create Blog
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {auth ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-md font-semibold text-sm sm:text-base hover:bg-red-600 hover:scale-105 transition-all duration-200"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-sm sm:text-base font-medium px-3 py-2 rounded-md hover:bg-gray-700 hover:text-blue-300 transition-all duration-200">
              Login
            </Link>
            <Link to="/signup" className="text-sm sm:text-base font-medium px-3 py-2 rounded-md hover:bg-gray-700 hover:text-blue-300 transition-all duration-200">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;