# Grocery Rush 3D - Development Contracts

## Current Implementation Status
✅ **Frontend with Mock Data - COMPLETE**
- 3D grocery store environment with Three.js
- FPS-style controls (WASD + Mouse)
- Dynamic shopping list generation
- Real-time timer countdown
- Score tracking
- Item collection mechanics
- Game over screens (win/lose)
- Beautiful UI with animations

## Mock Data Location
`/app/frontend/src/data/mock.js`
- GROCERY_ITEMS: Array of 25 grocery items
- generateShoppingList(): Generates random 8-item lists
- ITEM_COLORS: Color mapping for 3D items
- GAME_CONFIG: Game parameters (90s timer, 100pts per item)

## Proposed Backend API Contracts (Optional Enhancement)

### 1. High Score / Leaderboard System
**Endpoint:** `POST /api/scores`
**Request:**
```json
{
  "player_name": "string",
  "score": "number",
  "items_found": "number",
  "time_remaining": "number"
}
```

**Endpoint:** `GET /api/scores/leaderboard`
**Response:**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "player_name": "string",
      "score": "number",
      "items_found": "number",
      "date": "timestamp"
    }
  ]
}
```

### 2. Game Sessions (for multiplayer or tracking)
**Endpoint:** `POST /api/sessions`
**Request:**
```json
{
  "player_name": "string",
  "shopping_list": ["item1", "item2", ...]
}
```

**Endpoint:** `PUT /api/sessions/{session_id}`
**Request:**
```json
{
  "found_items": ["item1", "item2"],
  "score": "number",
  "time_elapsed": "number"
}
```

### 3. Custom Item Database
**Endpoint:** `GET /api/items`
- Returns all available grocery items with metadata

**Endpoint:** `POST /api/items`
- Add custom items (admin feature)

## MongoDB Collections (if backend implemented)

### scores_collection
```javascript
{
  _id: ObjectId,
  player_name: String,
  score: Number,
  items_found: Number,
  total_items: Number,
  time_remaining: Number,
  created_at: Date
}
```

### game_sessions_collection
```javascript
{
  _id: ObjectId,
  player_name: String,
  shopping_list: [String],
  found_items: [String],
  score: Number,
  status: String, // 'playing', 'won', 'lost'
  started_at: Date,
  completed_at: Date
}
```

## Frontend Integration Plan
If backend is implemented:
1. Replace mock.js generateShoppingList() with API call
2. Add player name input on home screen
3. Send score to backend on game completion
4. Display leaderboard on game over screen
5. Add social sharing features

## Notes
- Current implementation is fully functional as a single-player browser game
- Backend would enable: leaderboards, multiplayer, persistent data, custom items
- All game logic (movement, collision, timer) remains client-side for performance
