import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import GameScene from './GameScene';
import GameHUD from './GameHUD';
import GameOver from './GameOver';
import { generateShoppingList, GAME_CONFIG } from '../data/mock';

const GroceryGame = () => {
  const [gameState, setGameState] = useState('playing');
  const [shoppingList, setShoppingList] = useState(() => generateShoppingList(8));
  const [foundItems, setFoundItems] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.TIME_LIMIT);

  const handleItemFound = useCallback((itemName) => {
    if (foundItems.includes(itemName)) return;
    
    setFoundItems(prev => [...prev, itemName]);
    setScore(prev => prev + GAME_CONFIG.POINTS_PER_ITEM);
    
    // Check if all items found
    if (foundItems.length + 1 === shoppingList.length) {
      setGameState('won');
    }
  }, [foundItems, shoppingList.length]);

  const handleTimeUpdate = useCallback((time) => {
    setTimeLeft(time);
    if (time <= 0) {
      setGameState('lost');
    }
  }, []);

  const handleRestart = () => {
    setGameState('playing');
    setShoppingList(generateShoppingList(8));
    setFoundItems([]);
    setScore(0);
    setTimeLeft(GAME_CONFIG.TIME_LIMIT);
  };

  if (gameState !== 'playing') {
    return (
      <GameOver
        gameState={gameState}
        score={score}
        foundItems={foundItems.length}
        totalItems={shoppingList.length}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1.6, 0], fov: 75 }}
        style={{ background: '#87CEEB' }}
      >
        <GameScene
          shoppingList={shoppingList}
          foundItems={foundItems}
          onItemFound={handleItemFound}
        />
      </Canvas>
      <GameHUD
        shoppingList={shoppingList}
        foundItems={foundItems}
        score={score}
        timeLeft={timeLeft}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
};

export default GroceryGame;