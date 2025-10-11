// Mock data for grocery store items
export const GROCERY_ITEMS = [
  'Milk', 'Bread', 'Eggs', 'Cheese', 'Butter',
  'Apples', 'Bananas', 'Oranges', 'Carrots', 'Tomatoes',
  'Chicken', 'Beef', 'Fish', 'Rice', 'Pasta',
  'Cereal', 'Coffee', 'Tea', 'Sugar', 'Flour',
  'Yogurt', 'Juice', 'Water', 'Soda', 'Chips'
];

// Generate random shopping list
export const generateShoppingList = (count = 8) => {
  const shuffled = [...GROCERY_ITEMS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Item colors for 3D visualization
export const ITEM_COLORS = {
  'Milk': '#FFFFFF',
  'Bread': '#D4A574',
  'Eggs': '#F5DEB3',
  'Cheese': '#FFD700',
  'Butter': '#FFEB99',
  'Apples': '#FF3333',
  'Bananas': '#FFE135',
  'Oranges': '#FF8C00',
  'Carrots': '#FF6600',
  'Tomatoes': '#FF4444',
  'Chicken': '#FFE4C4',
  'Beef': '#8B0000',
  'Fish': '#87CEEB',
  'Rice': '#F5F5DC',
  'Pasta': '#F4E4C1',
  'Cereal': '#CD853F',
  'Coffee': '#6F4E37',
  'Tea': '#D2691E',
  'Sugar': '#FFFFFF',
  'Flour': '#FFFAF0',
  'Yogurt': '#FFF0F5',
  'Juice': '#FFA500',
  'Water': '#87CEEB',
  'Soda': '#228B22',
  'Chips': '#FFD700'
};

export const GAME_CONFIG = {
  TIME_LIMIT: 90,
  POINTS_PER_ITEM: 100,
  STORE_SIZE: 40,
  AISLE_COUNT: 4
};