import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Bisection from './roots/Bisection';
import FalsePosition from './roots/False-Position';
import OnePoint from './roots/One-Point';
import NewtonRaphson from './roots/Newton-Raphson';
import Home from './Home';
import Secant from './roots/Secant';
import CramerRule from './Cramer-Rule';
import Box from './today';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Box />} />
        <Route path="/Bisection" element={<Bisection />} />
        <Route path="/False-Position" element={<FalsePosition />} />
        <Route path="/One-Point" element={<OnePoint />} />
        <Route path="/Newton-Raphson" element={<NewtonRaphson />} />
        <Route path="/Secant" element={<Secant />} />
        <Route path="/Cramer-Rule" element={<CramerRule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
