import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>🌱 EcoFinds</h1>
          <p>
            Discover sustainable second-hand treasures and give items a new life. 
            Join our community of conscious consumers making a positive impact on the planet.
          </p>
          <div style={{ marginTop: '30px' }}>
            {user ? (
              <Link to="/products" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
                Start Shopping
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '15px 30px', marginRight: '15px' }}>
                  Join EcoFinds
                </Link>
                <Link to="/products" className="btn btn-outline" style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
                  Browse Products
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="container" style={{ padding: '80px 20px' }}>
        <div className="text-center mb-3">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#333' }}>
            Why Choose EcoFinds?
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            We're building a sustainable future, one purchase at a time.
          </p>
        </div>

        <div className="grid grid-3" style={{ marginTop: '60px' }}>
          <div className="card text-center">
            <div className="card-body">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>♻️</div>
              <h3 style={{ marginBottom: '15px' }}>Reduce Waste</h3>
              <p style={{ color: '#666' }}>
                Give pre-loved items a second chance and help reduce the environmental impact of fast consumption.
              </p>
            </div>
          </div>

          <div className="card text-center">
            <div className="card-body">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💰</div>
              <h3 style={{ marginBottom: '15px' }}>Save Money</h3>
              <p style={{ color: '#666' }}>
                Find amazing deals on quality items while supporting a circular economy that benefits everyone.
              </p>
            </div>
          </div>

          <div className="card text-center">
            <div className="card-body">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤝</div>
              <h3 style={{ marginBottom: '15px' }}>Build Community</h3>
              <p style={{ color: '#666' }}>
                Connect with like-minded individuals who share your values of sustainability and conscious consumption.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center" style={{ marginTop: '80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Ready to Get Started?</h2>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '30px' }}>
            Join thousands of users already making a difference
          </p>
          {!user && (
            <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '12px 25px' }}>
              Create Your Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
