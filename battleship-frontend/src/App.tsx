import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import GamePage from "./pages/GamePage";
import MainPage from "./pages/MainPage";
import SimulationPage from "./pages/SimulationPage";

function App() {
  return (
    <BrowserRouter>
      <h1 className="appTitle">Battleship Game</h1>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/simulation" element={<SimulationPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
