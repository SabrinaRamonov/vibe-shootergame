import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

const GameHUD = ({ shoppingList, foundItems, score, timeLeft, onTimeUpdate }) => {
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      onTimeUpdate(Math.max(0, timeLeft - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUpdate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      padding: '20px',
      color: 'white'
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '15px 25px',
        borderRadius: '12px',
        marginBottom: '20px'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Score: {score}
        </div>
        <div style={{ 
          fontSize: '28px', 
          fontWeight: 'bold',
          color: timeLeft < 20 ? '#ff4444' : '#ffffff'
        }}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Shopping list */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '20px',
        borderRadius: '12px',
        maxWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: 'bold' }}>
          Shopping List ({foundItems.length}/{shoppingList.length})
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {shoppingList.map((item, index) => {
            const isFound = foundItems.includes(item);
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  background: isFound ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  textDecoration: isFound ? 'line-through' : 'none',
                  opacity: isFound ? 0.6 : 1,
                  transition: 'all 0.3s ease'
                }}
              >
                {isFound && <Check size={18} color="#22c55e" />}
                <span style={{ fontSize: '16px' }}>{item}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '15px 25px',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '14px' }}>
          Use <strong>WASD</strong> to move | <strong>Mouse</strong> to look | Walk into items to collect
        </div>
      </div>
    </div>
  );
};

export default GameHUD;