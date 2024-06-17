// Dashboard.jsx

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const response = await axios.get('https://quicklearn-twi3.onrender.com/api/dashboard', config);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);
  const [subject, setSubject] = useState('');
  const [videos, setVideos] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://quicklearn-twi3.onrender.com/api/videos?subject=${subject}`);
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <h2>
      {dashboardData ? (
         <div className="App">
        <p>Welcome, <span className='bearername'>{dashboardData.authData.email}</span><br/>
        <button  className='react' style={{color:'#ce1212'}} onClick={handleLogout}>Logout</button>
        </p>
          <h1>Student Dashboard</h1>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter a search (e.g., Mathematics)"
          /><br/><br/><br/>
          <button className='react' onClick={handleSearch}>Search Videos</button>
          <div className="video-list">
            {videos.map((video) => (
              <div key={video.id} className="video-item">
                <h3>{video.title}</h3>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                ></iframe>
              </div>
            ))}
          </div>
      </div>
      ) : (<p>Loading...</p>)}
    </h2>
  );
};

export default Home;
