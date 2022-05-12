import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import MainPage from "./pages/MainPage";
import SimulationPage from "./pages/SimulationPage";

function App() {
  return (
    <BrowserRouter>
      <h1>Battleship Game</h1>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/simulation" element={<SimulationPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
