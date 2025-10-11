import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import GroceryGame from "./components/GroceryGame";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GroceryGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;