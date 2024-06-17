
// src/App.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Home page component
import Welcome from './pages/Welcome'; // Welcome page
import Nopage from './pages/Nopage'; 
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
// eslint-disable-next-line no-unused-vars
import './App.css';
function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" exact element={<Welcome />} />
        <Route path="/home"  element={<Home/>} />
        <Route path="/login"  element={<LoginForm/>} />
        <Route path="/register"  element={<RegisterForm/>} />
        <Route path="*" element={<Nopage/>} /> {/* Redirect unknown paths to page not found */}
        </Routes>
    </Router>
  );
}

export default App;