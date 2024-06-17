// src/components/RegisterForm.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; // Import your CSS file here
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate replaces useHistory in React Router v6

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://quicklearn-we95.onrender.com/api/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Store token in local storage
      console.log('Login successful');
      navigate('/home'); // Redirect to dashboard using navigate
    } catch (error) {
      console.error('Login failed:', error);
      setError('x Invalid credentials. Please try again x.'); // Set error message
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <p className="get-account">
      Fill the details below to login into your account.
      </p>
      <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}><b>{error}</b></p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
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
        <p className="read-the-docs">
      Create an account? <Link to='/register'> <span style={{textDecoration:'underline',color:'#CE1212',fontWeight:'bold'}}>Register here</span></Link>
      </p>
        <button type="submit" className='submitbutton'>Login</button>

      </form>
      <p className="read-the-docs">
      Rest assure that your data is save with us , we valued your data privacy. <Link to="/"><span style={{textDecoration:'underline',color:'#CE1212',fontWeight:'bold'}}>QuickLearn.io</span></Link>.
      </p>
    </div>
  );
};

export default LoginForm;
