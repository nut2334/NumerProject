import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import One from './One';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/one" element={<One />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
