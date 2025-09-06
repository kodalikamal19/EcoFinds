import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await api.post('/cart/', {
        product_id: product.id,
        quantity: quantity
      });
      alert('Product added to cart!');
    } catch (error) {
      alert('Failed to add product to cart');
    }
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <button 
        onClick={() => navigate('/products')} 
        className="btn btn-secondary"
        style={{ marginBottom: '30px' }}
      >
        ← Back to Products
      </button>

      <div className="grid grid-2" style={{ gap: '40px' }}>
        <div>
          <div className="product-image" style={{ height: '400px', borderRadius: '15px' }}>
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px' }}
              />
            ) : (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100%',
                fontSize: '5rem',
                color: '#6c757d'
              }}>
                📦
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="card">
            <div className="card-body">
              <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{product.title}</h1>
              <div className="product-price" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
                ${product.price}
              </div>
              <div className="product-category" style={{ marginBottom: '20px' }}>
                {product.category.name}
              </div>
              
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '10px' }}>Description</h3>
                <p style={{ lineHeight: '1.6', color: '#666' }}>
                  {product.description}
                </p>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '10px' }}>Seller</h3>
                <p style={{ color: '#666' }}>
                  Listed by <strong>{product.seller.username}</strong>
                </p>
              </div>

              {product.is_available ? (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label className="form-label">Quantity</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span style={{ minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={addToCart}
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '1.2rem', padding: '15px' }}
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <div style={{ 
                  padding: '20px', 
                  background: '#f8d7da', 
                  color: '#721c24', 
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <strong>This product is no longer available</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
