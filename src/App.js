import React, { useState, useEffect } from "react";
import ContextProvider from "./store/ContextProvider";

import "./App.css";
import Header from "./components/Header/Header";
import Levels from "./pages/Levels/Levels";
import Addition from "./pages/GameTypes/Addition/Addition";
import Multiplication from "./pages/GameTypes/Multiplication/Multiplication";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Header></Header>} />
        <Route path="/المراحل" element={<Levels />} />
        <Route path="/addition" element={<Addition />} />
        <Route path="/multiplication" element={<Multiplication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
