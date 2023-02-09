import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Bisection from './Bisection';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/Bisection" element={<Bisection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
