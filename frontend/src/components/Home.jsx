import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ShoppingCart, Clock, Target, Gamepad2 } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Animated background shapes */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        opacity: 0.1
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              background: 'white',
              borderRadius: '50%',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-30px); }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .feature-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>

      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '60px 40px',
        maxWidth: '700px',
        width: '90%',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        animation: 'fadeInUp 0.6s ease-out'
      }}>
        <div style={{
          fontSize: '72px',
          marginBottom: '20px'
        }}>
          <ShoppingCart size={80} color="#667eea" style={{ display: 'inline-block' }} />
        </div>

        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '15px'
        }}>
          Grocery Rush 3D
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          Race against time in a 3D grocery store! Find all items on your shopping list before time runs out.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div className="feature-card" style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '16px',
            color: 'white'
          }}>
            <Clock size={32} style={{ marginBottom: '10px' }} />
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>90 Seconds</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Time Limit</div>
          </div>

          <div className="feature-card" style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '16px',
            color: 'white'
          }}>
            <Target size={32} style={{ marginBottom: '10px' }} />
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>8 Items</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>To Find</div>
          </div>

          <div className="feature-card" style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            borderRadius: '16px',
            color: 'white'
          }}>
            <Gamepad2 size={32} style={{ marginBottom: '10px' }} />
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>FPS Controls</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>WASD + Mouse</div>
          </div>
        </div>

        <Button
          onClick={() => navigate('/game')}
          style={{
            width: '100%',
            padding: '20px',
            fontSize: '22px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
          }}
        >
          Start Game
        </Button>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '12px',
          fontSize: '14px',
          color: '#666'
        }}>
          <strong>How to Play:</strong> Use WASD keys to move, click & drag (or arrow keys) to look around. Walk into items to collect them. Find all items before time runs out!
        </div>
      </div>
    </div>
  );
};

export default Home;