// src/components/RegisterForm.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; // Import your CSS file here
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('https://quicklearn-we95.onrender.com/api/register', {
      username,
      email,
      password
    });
    if (response.status === 200) {
      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate('/login'); // Use navigate instead of window.location.href
      }, 2000);
    } else {
      setError('Registration failed. Please try again.');
    }
  } catch (error) {
    console.error('Registration failed:', error);
    setError('Registration failed. Please try again.');
  }
};


  return (
    <div className="container">
      <h1>Register</h1>
      <p className="get-account">
      Fill the details below to create an account with  <Link to="/"><span style={{textDecoration:'underline',color:'#CE1212'}}>QuickLearn.io</span></Link>.
      </p>
      <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}><b>{error}</b></p>}
      {successMessage && <p style={{ color: 'green' }}><b>{successMessage}</b></p>}
      <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder="Enter your password"
             required
          />
        </div>
        <div className="form-group checkbox">
        <h4>Accept our terms and conditions</h4>
         <input style={{marginLeft:'100px'}}
            type="checkbox"
            id="checkbox"
            name="checkbox"
            required
          />
        </div>
        <p className="read-the-docs">
      Already have an account? <Link to='/login'> <span style={{textDecoration:'underline',color:'#CE1212',fontWeight:'bold'}}>Login here</span></Link>
      </p>
        <button type="submit" className='submitbutton'>Register</button>
      </form>
      <p className="read-the-docs">
      Rest assure that your data is save with us , we valued your data privacy.<Link to="/"><span style={{textDecoration:'underline',color:'#CE1212',fontWeight:'bold'}}>QuickLearn.io</span></Link>.
      </p>
    </div>
  );
};

export default RegisterForm;