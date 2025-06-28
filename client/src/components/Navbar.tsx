import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const updateAuthState = () => {
    const token = localStorage.getItem('token');
    const storedName = localStorage.getItem('name');
    const storedRole = localStorage.getItem('role');
    setIsAuthenticated(!!token);
    setName(storedName);
    setRole(storedRole);
  };

  useEffect(() => {
    updateAuthState(); // Initial check

    // Listen to login/logout changes
    window.addEventListener('authChanged', updateAuthState);

    return () => {
      window.removeEventListener('authChanged', updateAuthState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setName(null);
    setRole(null);
    window.dispatchEvent(new Event('authChanged'));
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">Mini Zillow</Link>
      <div className="flex items-center space-x-4">
        {isAuthenticated && role === 'admin' && (
          <Link to="/admin" className="bg-yellow-500 px-3 py-1 rounded">
            Admin Panel
          </Link>
        )}
        {isAuthenticated ? (
          <>
            <span>Welcome, {name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
