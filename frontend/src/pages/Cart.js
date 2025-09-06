import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await api.get('/cart/');
      setCartItems(response.data);
    } catch (error) {
      setError('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    try {
      await api.put(`/cart/${itemId}`, null, {
        params: { quantity: newQuantity }
      });
      setCartItems(cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      alert('Failed to update quantity');
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      alert('Failed to remove item from cart');
    }
  };

  const clearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) {
      return;
    }

    try {
      await api.delete('/cart/');
      setCartItems([]);
    } catch (error) {
      alert('Failed to clear cart');
    }
  };

  const purchaseItems = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!window.confirm('Are you sure you want to purchase these items?')) {
      return;
    }

    setPurchasing(true);
    try {
      await api.post('/purchases/');
      setCartItems([]);
      alert('Purchase completed successfully!');
    } catch (error) {
      alert('Failed to complete purchase');
    } finally {
      setPurchasing(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="text-center mb-3">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Shopping Cart</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Review your items before purchase
        </p>
      </div>

      {error && <div className="error">{error}</div>}

      {cartItems.length === 0 ? (
        <div className="text-center" style={{ padding: '60px 20px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
          <h3 style={{ marginBottom: '10px' }}>Your cart is empty</h3>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            Start shopping to add items to your cart
          </p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '30px' }}>
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  {item.product.image_url ? (
                    <img
                      src={item.product.image_url}
                      alt={item.product.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                    />
                  ) : (
                    '📦'
                  )}
                </div>
                
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.product.title}</h3>
                  <div className="cart-item-price">${item.product.price}</div>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    {item.product.category.name}
                  </div>
                </div>
                
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span style={{ minWidth: '30px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <div style={{ textAlign: 'right', marginLeft: '20px' }}>
                    <div style={{ fontWeight: '600', color: '#28a745' }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-danger"
                      style={{ fontSize: '0.8rem', padding: '5px 10px', marginTop: '5px' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>Total: ${calculateTotal().toFixed(2)}</h3>
                <button
                  onClick={clearCart}
                  className="btn btn-secondary"
                >
                  Clear Cart
                </button>
              </div>
              
              <button
                onClick={purchaseItems}
                className="btn btn-primary"
                style={{ width: '100%', fontSize: '1.2rem', padding: '15px' }}
                disabled={purchasing}
              >
                {purchasing ? 'Processing...' : 'Complete Purchase'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
