import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          🌱 EcoFinds
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <Link to="/products">Browse Products</Link>
          </li>
          
          {user ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/my-listings">My Listings</Link>
              </li>
              <li>
                <Link to="/add-product">+ Add Product</Link>
              </li>
              <li>
                <Link to="/cart">🛒 Cart</Link>
              </li>
              <li>
                <Link to="/purchase-history">Purchase History</Link>
              </li>
              <li>
                <span>Welcome, {user.username}!</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-outline">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
