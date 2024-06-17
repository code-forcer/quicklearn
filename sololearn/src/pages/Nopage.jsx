// src/pages/Home.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
const Nopage = () => {
  return (
    <div>
      <h1>Oops!!!</h1>
      <p>This page cannot found on this server.</p>
      <div className="card">
        <Link to="/">
        <button className='react'>
              Home 
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Nopage;
