import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    username: user?.username || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await updateUser(formData);
    
    if (result.success) {
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } else {
      setMessage(result.error);
    }
    
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      email: user?.email || '',
      username: user?.username || '',
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
    setMessage('');
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="text-center mb-3">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Dashboard</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Welcome back, {user?.username}!
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Profile Information</h3>
          
          {message && (
            <div className={message.includes('success') ? 'success' : 'error'}>
              {message}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="3"
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="profile-field">
                <span className="profile-label">Email:</span>
                <span className="profile-value">{user?.email || 'Not provided'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-label">Username:</span>
                <span className="profile-value">{user?.username || 'Not provided'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-label">First Name:</span>
                <span className="profile-value">{user?.first_name || 'Not provided'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-label">Last Name:</span>
                <span className="profile-value">{user?.last_name || 'Not provided'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-label">Phone:</span>
                <span className="profile-value">{user?.phone || 'Not provided'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-label">Address:</span>
                <span className="profile-value">{user?.address || 'Not provided'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-label">Member Since:</span>
                <span className="profile-value">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
              
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary"
                style={{ marginTop: '20px' }}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <div className="dashboard-card">
          <h3>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Link to="/add-product" className="btn btn-primary">
              + Add New Product
            </Link>
            <Link to="/my-listings" className="btn btn-outline">
              View My Listings
            </Link>
            <Link to="/cart" className="btn btn-outline">
              View Cart
            </Link>
            <Link to="/purchase-history" className="btn btn-outline">
              Purchase History
            </Link>
            <Link to="/products" className="btn btn-outline">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
