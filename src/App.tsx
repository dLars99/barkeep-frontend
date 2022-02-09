import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./views/Homepage";
import CreateDrink from "./views/CreateDrink";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/newdrink" element={<CreateDrink />} />
      </Routes>
    </Router>
  );
}

export default App;
