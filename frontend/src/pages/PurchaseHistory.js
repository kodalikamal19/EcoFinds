import React, { useState, useEffect } from 'react';
import api from '../services/api';

function PurchaseHistory() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPurchaseHistory();
  }, []);

  const fetchPurchaseHistory = async () => {
    try {
      const response = await api.get('/purchases/');
      setPurchases(response.data);
    } catch (error) {
      setError('Failed to fetch purchase history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading purchase history...</div>;
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="text-center mb-3">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Purchase History</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Your past purchases and orders
        </p>
      </div>

      {error && <div className="error">{error}</div>}

      {purchases.length === 0 ? (
        <div className="text-center" style={{ padding: '60px 20px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📋</div>
          <h3 style={{ marginBottom: '10px' }}>No purchases yet</h3>
          <p style={{ color: '#666' }}>
            Your purchase history will appear here once you make your first purchase
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {purchases.map(purchase => (
            <div key={purchase.id} className="card">
              <div className="card-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Purchase #{purchase.id}</h3>
                  <div>
                    <span style={{ 
                      padding: '5px 15px', 
                      borderRadius: '20px', 
                      background: '#d4edda', 
                      color: '#155724',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      {purchase.status}
                    </span>
                  </div>
                </div>
                <div style={{ color: '#666', marginTop: '10px' }}>
                  <strong>Date:</strong> {new Date(purchase.created_at).toLocaleDateString()}
                  <span style={{ marginLeft: '20px' }}>
                    <strong>Total:</strong> ₹{purchase.total_amount.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="card-body">
                <h4 style={{ marginBottom: '15px' }}>Items Purchased:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {purchase.items.map(item => (
                    <div key={item.id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '10px',
                      background: '#f8f9fa',
                      borderRadius: '5px'
                    }}>
                      <div>
                        <strong>{item.product.title}</strong>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                          {item.product.category.name}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div>Qty: {item.quantity}</div>
                        <div style={{ color: '#28a745', fontWeight: '600' }}>
                          ₹{item.price_at_purchase.toFixed(2)} each
                        </div>
                        <div style={{ fontWeight: '600' }}>
                          Total: ₹{(item.price_at_purchase * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PurchaseHistory;
