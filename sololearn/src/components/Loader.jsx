// src/components/Loader.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../App.css'; 

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
};

export default Loader;
