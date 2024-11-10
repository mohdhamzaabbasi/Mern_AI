import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to Your Personalized Recipe Generator</h1>
        <br>
        </br>
        <p>Discover & create recipes tailored just for you.</p>
        <br>
        </br>
        <br>
        </br>
      </header>

      <div className="landing-content">
        <img
          src="logo.png"  // Placeholder image; replace with a relevant image URL
          alt="Delicious recipes"
          className="landing-image"
        />
        <div className="landing-actions">
          <button onClick={() => navigate('/login')} className="login-button">Login</button>
          <button onClick={() => navigate('/register')} className="register-btn">Register</button>
          <button onClick={() => navigate('/delete')} className="delete-btn">Delete</button>
          <button onClick={() => navigate('/update')} className="update-button">Update</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
