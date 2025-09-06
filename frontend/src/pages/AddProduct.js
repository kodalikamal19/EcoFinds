import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category_id: '',
    image_url: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/products/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id)
      };
      
      await api.post('/products/', productData);
      navigate('/my-listings');
    } catch (error) {
      setError(error.response?.data?.detail || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <button 
        onClick={() => navigate('/dashboard')} 
        className="btn btn-secondary"
        style={{ marginBottom: '30px' }}
      >
        ← Back to Dashboard
      </button>

      <div className="form-container">
        <h1 className="form-title">Add New Product</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          List your item for sale and help build a sustainable marketplace
        </p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Product Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter a descriptive title for your product"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Describe your product in detail. Include condition, size, brand, etc."
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL (Optional)</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="form-input"
              placeholder="https://example.com/image.jpg"
            />
            <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
              You can add an image URL for your product. For now, we'll use a placeholder if no URL is provided.
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '20px' }}
            disabled={loading}
          >
            {loading ? 'Creating Listing...' : 'Create Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
