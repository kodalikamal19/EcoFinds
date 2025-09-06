import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function MyListings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const response = await api.get('/products/my/listings');
      setProducts(response.data);
    } catch (error) {
      setError('Failed to fetch your products');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  if (loading) {
    return <div className="loading">Loading your products...</div>;
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="text-center mb-3">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>My Listings</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Manage your product listings
        </p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Link to="/add-product" className="btn btn-primary">
          + Add New Product
        </Link>
      </div>

      {error && <div className="error">{error}</div>}

      {products.length === 0 ? (
        <div className="text-center" style={{ padding: '60px 20px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📦</div>
          <h3 style={{ marginBottom: '10px' }}>No products listed yet</h3>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            Start selling by adding your first product
          </p>
          <Link to="/add-product" className="btn btn-primary">
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  '📦'
                )}
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <div className="product-price">${product.price}</div>
                <div className="product-category">{product.category.name}</div>
                <p style={{ 
                  marginTop: '10px', 
                  color: '#666', 
                  fontSize: '0.9rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {product.description}
                </p>
                
                <div style={{ 
                  marginTop: '15px', 
                  padding: '10px', 
                  background: product.is_available ? '#d4edda' : '#f8d7da',
                  color: product.is_available ? '#155724' : '#721c24',
                  borderRadius: '5px',
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  {product.is_available ? 'Available' : 'Sold'}
                </div>
              </div>
              
              <div className="card-footer">
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link 
                    to={`/products/${product.id}`} 
                    className="btn btn-outline"
                    style={{ flex: 1 }}
                  >
                    View
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="btn btn-danger"
                    style={{ flex: 1 }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListings;
