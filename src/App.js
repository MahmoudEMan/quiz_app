import "./App.css";
import Header from "./components/Header/Header";
import Levels from "./pages/Levels/Levels";
import Game from "./pages/Game/Game";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Header></Header>} />
        <Route exact path="/المراحل" element={<Levels />} />
        <Route exact path="/الامتحان" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
