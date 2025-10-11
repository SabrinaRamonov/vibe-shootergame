import React, { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { ITEM_COLORS, GAME_CONFIG } from '../data/mock';

// Store environment component
const StoreFloor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[GAME_CONFIG.STORE_SIZE, GAME_CONFIG.STORE_SIZE]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  );
};

// Shelf component
const Shelf = ({ position }) => {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3, 1, 0.3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Top shelf */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[3, 0.1, 0.3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Middle shelf */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3, 0.1, 0.3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
};

// Item component
const GroceryItem = ({ name, position, onCollect, isFound }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current && !isFound) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  if (isFound) return null;

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial 
          color={ITEM_COLORS[name] || '#FF6B6B'}
          emissive={hovered ? '#ffffff' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.2}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

// Player controller with WASD
const Player = ({ onItemCollect, itemPositions, foundItems }) => {
  const { camera } = useThree();
  const moveSpeed = 0.1;
  const keysPressed = useRef({});
  const velocity = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.code] = true;
    };
    const handleKeyUp = (e) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const direction = new THREE.Vector3();
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    if (keysPressed.current['KeyW']) direction.add(forward);
    if (keysPressed.current['KeyS']) direction.sub(forward);
    if (keysPressed.current['KeyA']) direction.sub(right);
    if (keysPressed.current['KeyD']) direction.add(right);

    if (direction.length() > 0) {
      direction.normalize().multiplyScalar(moveSpeed);
      camera.position.add(direction);

      // Boundary check
      const halfSize = GAME_CONFIG.STORE_SIZE / 2 - 1;
      camera.position.x = Math.max(-halfSize, Math.min(halfSize, camera.position.x));
      camera.position.z = Math.max(-halfSize, Math.min(halfSize, camera.position.z));

      // Check for item collision
      itemPositions.forEach((item) => {
        if (foundItems.includes(item.name)) return;
        
        const distance = camera.position.distanceTo(new THREE.Vector3(...item.position));
        if (distance < 1) {
          onItemCollect(item.name);
        }
      });
    }
  });

  return <PointerLockControls />;
};

// Main scene
const GameScene = ({ shoppingList, foundItems, onItemFound }) => {
  const [itemPositions] = useState(() => {
    const positions = [];
    const spacing = 4;
    const rows = 4;
    const cols = 6;
    
    shoppingList.forEach((item, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = (col - cols / 2) * spacing;
      const z = (row - rows / 2) * spacing;
      
      positions.push({
        name: item,
        position: [x, 1, z]
      });
    });
    
    return positions;
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
      <directionalLight position={[-10, 20, -10]} intensity={0.8} />
      <pointLight position={[0, 10, 0]} intensity={1} />
      <hemisphereLight intensity={0.5} />
      
      <fog attach="fog" args={['#87CEEB', 30, 50]} />

      <StoreFloor />

      {/* Store walls */}
      <mesh position={[0, 2, -GAME_CONFIG.STORE_SIZE/2]} receiveShadow>
        <boxGeometry args={[GAME_CONFIG.STORE_SIZE, 4, 0.5]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[0, 2, GAME_CONFIG.STORE_SIZE/2]} receiveShadow>
        <boxGeometry args={[GAME_CONFIG.STORE_SIZE, 4, 0.5]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[-GAME_CONFIG.STORE_SIZE/2, 2, 0]} receiveShadow>
        <boxGeometry args={[0.5, 4, GAME_CONFIG.STORE_SIZE]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[GAME_CONFIG.STORE_SIZE/2, 2, 0]} receiveShadow>
        <boxGeometry args={[0.5, 4, GAME_CONFIG.STORE_SIZE]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>

      {/* Create aisles with shelves */}
      {[-8, -4, 4, 8].map((x, i) => (
        <React.Fragment key={i}>
          <Shelf position={[x, 0, -6]} />
          <Shelf position={[x, 0, 0]} />
          <Shelf position={[x, 0, 6]} />
        </React.Fragment>
      ))}

      {/* Render items */}
      {itemPositions.map((item, index) => (
        <GroceryItem
          key={index}
          name={item.name}
          position={item.position}
          onCollect={onItemFound}
          isFound={foundItems.includes(item.name)}
        />
      ))}

      <Player
        onItemCollect={onItemFound}
        itemPositions={itemPositions}
        foundItems={foundItems}
      />
    </>
  );
};

export default GameScene;