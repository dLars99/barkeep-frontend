import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./views/Homepage";
import CreateDrink from "./views/CreateDrink";
import CreateIngredient from "./views/CreateIngredient";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/newdrink" element={<CreateDrink />} />
        <Route path="/newingredient" element={<CreateIngredient />} />
      </Routes>
    </Router>
  );
}

export default App;
