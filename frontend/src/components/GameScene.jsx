import React, { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { ITEM_COLORS, GAME_CONFIG } from '../data/mock';

// Bullet trace component
const BulletTrace = ({ start, end, onComplete }) => {
  const lineRef = useRef();
  const [opacity, setOpacity] = useState(1);

  useFrame(() => {
    if (opacity > 0) {
      setOpacity(prev => Math.max(0, prev - 0.1));
    } else {
      onComplete();
    }
  });

  const points = [start, end];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={lineRef} geometry={lineGeometry}>
      <lineBasicMaterial color="#ffff00" transparent opacity={opacity} linewidth={2} />
    </line>
  );
};

// Weapon (AK-47 style)
const Weapon = () => {
  const weaponRef = useRef();
  
  useFrame((state) => {
    if (weaponRef.current) {
      // Slight weapon sway
      weaponRef.current.position.x = Math.sin(state.clock.elapsedTime * 2) * 0.002;
      weaponRef.current.position.y = Math.cos(state.clock.elapsedTime * 2) * 0.002;
    }
  });

  return (
    <group 
      ref={weaponRef}
      position={[0.3, -0.3, -0.5]} 
      rotation={[0, -0.1, 0]}
    >
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.08, 0.4]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.4} />
      </mesh>
      
      {/* Barrel */}
      <mesh position={[0, 0.02, -0.3]}>
        <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Magazine */}
      <mesh position={[0, -0.08, 0.05]}>
        <boxGeometry args={[0.04, 0.12, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.5} />
      </mesh>
      
      {/* Stock */}
      <mesh position={[0, 0, 0.25]}>
        <boxGeometry args={[0.06, 0.06, 0.15]} />
        <meshStandardMaterial color="#4a3520" roughness={0.7} />
      </mesh>
      
      {/* Grip */}
      <mesh position={[0, -0.05, 0.1]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.04, 0.08, 0.04]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
      
      {/* Muzzle flash holder */}
      <mesh position={[0, 0.02, -0.45]}>
        <cylinderGeometry args={[0.025, 0.02, 0.03, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};

// Store environment components
const StoreFloor = () => {
  return (
    <group>
      {/* Main floor with tile pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[GAME_CONFIG.STORE_SIZE, GAME_CONFIG.STORE_SIZE]} />
        <meshStandardMaterial 
          color="#e8e8e8"
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Floor tiles grid pattern */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh 
          key={`line-x-${i}`} 
          position={[-GAME_CONFIG.STORE_SIZE/2 + i*2, 0.01, 0]} 
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.05, GAME_CONFIG.STORE_SIZE]} />
          <meshBasicMaterial color="#d0d0d0" transparent opacity={0.3} />
        </mesh>
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh 
          key={`line-z-${i}`} 
          position={[0, 0.01, -GAME_CONFIG.STORE_SIZE/2 + i*2]} 
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[GAME_CONFIG.STORE_SIZE, 0.05]} />
          <meshBasicMaterial color="#d0d0d0" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// Ceiling with lights
const Ceiling = () => {
  return (
    <group>
      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[GAME_CONFIG.STORE_SIZE, GAME_CONFIG.STORE_SIZE]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      
      {/* Ceiling lights */}
      {[-10, -5, 0, 5, 10].map((x) =>
        [-10, 0, 10].map((z) => (
          <group key={`light-${x}-${z}`} position={[x, 3.8, z]}>
            <mesh>
              <boxGeometry args={[1.5, 0.1, 0.4]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffe0" emissiveIntensity={0.8} />
            </mesh>
            <pointLight position={[0, -0.3, 0]} intensity={0.5} distance={8} color="#ffffee" />
          </group>
        ))
      )}
    </group>
  );
};

// Enhanced shelf component
const Shelf = ({ position }) => {
  return (
    <group position={position}>
      {/* Metal frame - sides */}
      <mesh position={[-1.4, 1, 0]}>
        <boxGeometry args={[0.08, 2, 0.4]} />
        <meshStandardMaterial color="#606060" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[1.4, 1, 0]}>
        <boxGeometry args={[0.08, 2, 0.4]} />
        <meshStandardMaterial color="#606060" metalness={0.8} roughness={0.3} />
      </mesh>
      
      {/* Wooden shelves */}
      {[0.3, 0.9, 1.5, 1.9].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[2.8, 0.06, 0.35]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#d4a574" : "#c89563"} 
            roughness={0.7}
          />
        </mesh>
      ))}
      
      {/* Back panel */}
      <mesh position={[0, 1, -0.15]}>
        <boxGeometry args={[2.8, 2, 0.02]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Price tag holders */}
      {[-0.9, 0, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 0.25, 0.2]}>
          <boxGeometry args={[0.3, 0.02, 0.15]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
};

// Enhanced grocery item models
const GroceryItemModel = ({ name, hovered }) => {
  const color = ITEM_COLORS[name] || '#FF6B6B';
  
  // Different models based on item type
  const renderItemModel = () => {
    switch(name) {
      case 'Milk':
      case 'Juice':
      case 'Water':
        // Carton/bottle
        return (
          <group>
            <mesh position={[0, 0.15, 0]}>
              <boxGeometry args={[0.15, 0.3, 0.1]} />
              <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
            </mesh>
            <mesh position={[0, 0.32, 0]}>
              <boxGeometry args={[0.16, 0.04, 0.11]} />
              <meshStandardMaterial color="#ff0000" />
            </mesh>
          </group>
        );
      
      case 'Bread':
      case 'Butter':
        // Loaf/package shape
        return (
          <mesh>
            <boxGeometry args={[0.25, 0.12, 0.15]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
        );
      
      case 'Eggs':
        // Egg carton
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.2, 0.08, 0.15]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
            {/* Egg bumps */}
            {[-0.06, 0, 0.06].map((x, i) => (
              <mesh key={i} position={[x, 0.05, 0]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshStandardMaterial color="#fffef0" />
              </mesh>
            ))}
          </group>
        );
      
      case 'Cheese':
        // Cheese wedge
        return (
          <mesh rotation={[0, 0, Math.PI / 8]}>
            <boxGeometry args={[0.18, 0.15, 0.12]} />
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
        );
      
      case 'Apples':
      case 'Oranges':
      case 'Tomatoes':
        // Round produce
        return (
          <group>
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color={color} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.03, 8]} />
              <meshStandardMaterial color="#2d5016" />
            </mesh>
          </group>
        );
      
      case 'Bananas':
        // Banana bunch
        return (
          <group>
            {[0, 0.15, -0.15].map((z, i) => (
              <mesh key={i} position={[0, 0, z]} rotation={[0, 0, i * 0.2]}>
                <capsuleGeometry args={[0.04, 0.2, 8, 16]} />
                <meshStandardMaterial color={color} roughness={0.5} />
              </mesh>
            ))}
          </group>
        );
      
      case 'Carrots':
        // Carrot bundle
        return (
          <group>
            {[-0.05, 0, 0.05].map((x, i) => (
              <group key={i} position={[x, 0, 0]}>
                <mesh rotation={[0, 0, Math.PI]}>
                  <coneGeometry args={[0.03, 0.2, 8]} />
                  <meshStandardMaterial color={color} roughness={0.6} />
                </mesh>
                <mesh position={[0, 0.12, 0]}>
                  <cylinderGeometry args={[0.02, 0.02, 0.05, 6]} />
                  <meshStandardMaterial color="#228b22" />
                </mesh>
              </group>
            ))}
          </group>
        );
      
      case 'Chicken':
      case 'Beef':
      case 'Fish':
        // Meat package
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.22, 0.08, 0.18]} />
              <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
            </mesh>
            <mesh position={[0, 0.041, 0]}>
              <boxGeometry args={[0.18, 0.001, 0.14]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          </group>
        );
      
      case 'Rice':
      case 'Pasta':
      case 'Flour':
      case 'Sugar':
        // Bag
        return (
          <mesh>
            <boxGeometry args={[0.18, 0.25, 0.12]} />
            <meshStandardMaterial color={color} roughness={0.7} />
          </mesh>
        );
      
      case 'Cereal':
        // Cereal box
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.16, 0.3, 0.08]} />
              <meshStandardMaterial color={color} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.1, 0.041]}>
              <boxGeometry args={[0.12, 0.12, 0.001]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          </group>
        );
      
      case 'Coffee':
      case 'Tea':
        // Can/jar
        return (
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
          </mesh>
        );
      
      case 'Yogurt':
        // Yogurt cup
        return (
          <mesh>
            <cylinderGeometry args={[0.07, 0.08, 0.12, 16]} />
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
        );
      
      case 'Soda':
        // Can
        return (
          <mesh>
            <cylinderGeometry args={[0.06, 0.06, 0.2, 16]} />
            <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
          </mesh>
        );
      
      case 'Chips':
        // Chip bag
        return (
          <mesh>
            <boxGeometry args={[0.2, 0.25, 0.08]} />
            <meshStandardMaterial color={color} roughness={0.6} metalness={0.3} />
          </mesh>
        );
      
      default:
        // Default box
        return (
          <mesh>
            <boxGeometry args={[0.2, 0.2, 0.15]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
    }
  };

  return (
    <group scale={hovered ? 1.3 : 1}>
      {renderItemModel()}
      {/* Glow effect when hovered */}
      {hovered && (
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
};

// Item component with enhanced model
const GroceryItem = ({ name, position, onCollect, isFound }) => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (groupRef.current && !isFound) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.03;
    }
  });

  if (isFound) return null;

  return (
    <group position={position} ref={groupRef}>
      <group
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <GroceryItemModel name={name} hovered={hovered} />
      </group>
      
      {/* Item label */}
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.15}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#ffffff"
      >
        {name}
      </Text>
      
      {/* Floating indicator */}
      {hovered && (
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.12}
          color="#22c55e"
          anchorX="center"
          anchorY="middle"
        >
          Walk here!
        </Text>
      )}
    </group>
  );
};

// Custom FPS controller with shooting
const Player = ({ onItemCollect, itemPositions, foundItems, onShoot }) => {
  const { camera, gl, scene } = useThree();
  const moveSpeed = 0.1;
  const lookSpeed = 0.002;
  const keysPressed = useRef({});
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const mouseDown = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.code] = true;
    };
    const handleKeyUp = (e) => {
      keysPressed.current[e.code] = false;
    };

    const handleMouseDown = (e) => {
      if (e.button === 0) { // Left click - shoot
        handleShoot();
      } else if (e.button === 2) { // Right click - look mode
        mouseDown.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        e.preventDefault();
      }
    };

    const handleMouseUp = (e) => {
      if (e.button === 2) {
        mouseDown.current = false;
      }
    };

    const handleMouseMove = (e) => {
      if (mouseDown.current) {
        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;

        euler.current.setFromQuaternion(camera.quaternion);
        euler.current.y -= deltaX * lookSpeed;
        euler.current.x -= deltaY * lookSpeed;
        euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
        camera.quaternion.setFromEuler(euler.current);

        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleShoot = () => {
      // Raycast from camera center
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      
      // Get all item meshes
      const itemMeshes = [];
      scene.traverse((obj) => {
        if (obj.userData.isItem && !obj.userData.isFound) {
          itemMeshes.push(obj);
        }
      });
      
      const intersects = raycaster.intersectObjects(itemMeshes, true);
      
      if (intersects.length > 0) {
        const hitObject = intersects[0].object;
        // Find parent group with item name
        let itemGroup = hitObject;
        while (itemGroup.parent && !itemGroup.userData.itemName) {
          itemGroup = itemGroup.parent;
        }
        
        if (itemGroup.userData.itemName) {
          onShoot(
            camera.position.clone(),
            intersects[0].point,
            itemGroup.userData.itemName,
            true
          );
        }
      } else {
        // Shoot into distance
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        const endPoint = camera.position.clone().add(direction.multiplyScalar(50));
        onShoot(camera.position.clone(), endPoint, null, false);
      }
    };

    // Arrow keys for looking
    const handleArrowLook = () => {
      if (keysPressed.current['ArrowLeft']) {
        euler.current.setFromQuaternion(camera.quaternion);
        euler.current.y += 0.05;
        camera.quaternion.setFromEuler(euler.current);
      }
      if (keysPressed.current['ArrowRight']) {
        euler.current.setFromQuaternion(camera.quaternion);
        euler.current.y -= 0.05;
        camera.quaternion.setFromEuler(euler.current);
      }
      if (keysPressed.current['ArrowUp']) {
        euler.current.setFromQuaternion(camera.quaternion);
        euler.current.x += 0.05;
        euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
        camera.quaternion.setFromEuler(euler.current);
      }
      if (keysPressed.current['ArrowDown']) {
        euler.current.setFromQuaternion(camera.quaternion);
        euler.current.x -= 0.05;
        euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
        camera.quaternion.setFromEuler(euler.current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    gl.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    const arrowInterval = setInterval(handleArrowLook, 16);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      gl.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(arrowInterval);
    };
  }, [camera, gl]);

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

  return null;
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
      {/* Enhanced lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[15, 20, 15]} intensity={1} castShadow />
      <directionalLight position={[-15, 20, -15]} intensity={0.7} />
      <hemisphereLight intensity={0.4} groundColor="#cccccc" />
      
      <fog attach="fog" args={['#d6e8f5', 35, 55]} />

      <StoreFloor />
      <Ceiling />

      {/* Store walls with better materials */}
      <mesh position={[0, 2, -GAME_CONFIG.STORE_SIZE/2]} receiveShadow>
        <boxGeometry args={[GAME_CONFIG.STORE_SIZE, 4, 0.5]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.6} />
      </mesh>
      <mesh position={[0, 2, GAME_CONFIG.STORE_SIZE/2]} receiveShadow>
        <boxGeometry args={[GAME_CONFIG.STORE_SIZE, 4, 0.5]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.6} />
      </mesh>
      <mesh position={[-GAME_CONFIG.STORE_SIZE/2, 2, 0]} receiveShadow>
        <boxGeometry args={[0.5, 4, GAME_CONFIG.STORE_SIZE]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.6} />
      </mesh>
      <mesh position={[GAME_CONFIG.STORE_SIZE/2, 2, 0]} receiveShadow>
        <boxGeometry args={[0.5, 4, GAME_CONFIG.STORE_SIZE]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.6} />
      </mesh>

      {/* Store entrance sign */}
      <group position={[0, 3, -19]}>
        <mesh>
          <boxGeometry args={[8, 0.8, 0.2]} />
          <meshStandardMaterial color="#ff6b35" emissive="#ff6b35" emissiveIntensity={0.3} />
        </mesh>
        <Text
          position={[0, 0, 0.11]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          GROCERY RUSH
        </Text>
      </group>

      {/* Checkout counter area */}
      <group position={[0, 0, -15]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[6, 1, 1.5]} />
          <meshStandardMaterial color="#4a5568" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[5.5, 0.1, 1.2]} />
          <meshStandardMaterial color="#2d3748" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Aisle signs */}
      {[-8, -4, 4, 8].map((x, i) => (
        <group key={`sign-${i}`} position={[x, 3.2, 0]}>
          <mesh>
            <boxGeometry args={[1.5, 0.4, 0.05]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
          <Text
            position={[0, 0, 0.03]}
            fontSize={0.18}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            Aisle {i + 1}
          </Text>
        </group>
      ))}

      {/* Create aisles with enhanced shelves */}
      {[-8, -4, 4, 8].map((x, i) => (
        <React.Fragment key={i}>
          <Shelf position={[x, 0, -8]} />
          <Shelf position={[x, 0, -4]} />
          <Shelf position={[x, 0, 0]} />
          <Shelf position={[x, 0, 4]} />
          <Shelf position={[x, 0, 8]} />
        </React.Fragment>
      ))}

      {/* Shopping carts decoration */}
      {[-15, 15].map((z, i) => (
        <group key={`cart-${i}`} position={[-17, 0, z]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.5, 0.6, 0.7]} />
            <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
            <meshStandardMaterial color="#404040" />
          </mesh>
        </group>
      ))}

      {/* Render items with enhanced models */}
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