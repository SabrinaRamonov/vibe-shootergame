import React from 'react';
import { Button } from './ui/button';
import { Trophy, Clock, Target } from 'lucide-react';

const GameOver = ({ gameState, score, foundItems, totalItems, onRestart }) => {
  const isWin = gameState === 'won';

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '50px',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%'
      }}>
        <div style={{
          fontSize: '60px',
          marginBottom: '20px'
        }}>
          {isWin ? '🎉' : '⏰'}
        </div>
        
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: isWin ? '#22c55e' : '#ef4444'
        }}>
          {isWin ? 'Congratulations!' : 'Time\'s Up!'}
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '30px'
        }}>
          {isWin 
            ? 'You found all items!' 
            : 'Better luck next time!'}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '30px 0',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <div>
            <Trophy size={32} color="#fbbf24" style={{ margin: '0 auto 10px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
              {score}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Score</div>
          </div>
          
          <div>
            <Target size={32} color="#3b82f6" style={{ margin: '0 auto 10px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
              {foundItems}/{totalItems}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Items Found</div>
          </div>
        </div>

        <Button
          onClick={onRestart}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white',
            fontWeight: 'bold',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Play Again
        </Button>
      </div>
    </div>
  );
};

export default GameOver;