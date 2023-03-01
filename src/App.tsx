import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Bisection from './Bisection';
import FalsePosition from './False-Position';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/Bisection" element={<Bisection />} />
        <Route path="/False-Position" element={<FalsePosition />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
