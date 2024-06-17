// eslint-disable-next-line no-unused-vars
import viteLogo from '/vite.svg?url';
import '../App.css'
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader'; // Import your Loader component
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [isLoading, setLoading] = useState(true);
  const devname = 'Codeforcer';
  const navigate = useNavigate();
  useEffect(() => {
    // Simulate a delay to show the loader
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader after delay
    }, 2000); // Adjust the delay time as needed (2 seconds here)

    // Clean up timer on unmount or whenever isLoading changes
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    navigate('/register');
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
         <h2>
      <div>
        <a href="#" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1><q>Explore endless world</q></h1>
      <h2 style={{color:'#04aeff'}}><span style={{color:'#CE1212'}}>With</span> <b>{devname}</b><span style={{color:'#fff'}}>.</span></h2>
      <div className="card">
        <button className='react' onClick={handleButtonClick}>
                Go now  
        </button>
        <p>
         click now to get started.
        </p>
      </div>
      <p className="read-the-docs">
      Do more with <span style={{textDecoration:'underline',color:'#CE1212'}}>QuickLearn.io</span> , Exploring amazing learning environment. 
      </p>
    </h2>
      )}
    </div>
  );
};

export default Welcome;
