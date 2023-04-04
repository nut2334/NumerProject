import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Bisection from './Bisection';
import FalsePosition from './False-Position';
import OnePoint from './One-Point';
import NewtonRaphson from './Newton-Raphson';
import Home from './Home';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Bisection" element={<Bisection />} />
        <Route path="/False-Position" element={<FalsePosition />} />
        <Route path="/One-Point" element={<OnePoint />} />
        <Route path="/Newton-Raphson" element={<NewtonRaphson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
