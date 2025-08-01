import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-lg">KanbanFlow</Link>
        <div>
          {user ? (
            <button onClick={logout} className="text-white">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
