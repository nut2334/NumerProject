import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Bisection from './Bisection';
import FalsePosition from './False-Position';
import OnePoint from './One-Point';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/Bisection" element={<Bisection />} />
        <Route path="/False-Position" element={<FalsePosition />} />
        <Route path="/One-Point" element={<OnePoint />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
