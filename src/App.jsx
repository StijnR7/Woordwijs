import Game from "./game/game";
import Admin from "./admin/admin";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Game />} />
    </Routes>
  );
}

export default App;
