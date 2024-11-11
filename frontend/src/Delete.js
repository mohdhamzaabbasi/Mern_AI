import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Delete.css';

const Delete = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.158.128:5000/api/auth/delete-account', {
        username,
        password,
      });

      if (response.status === 200) {
        setMessage('Account deleted successfully.');
        setTimeout(() => {
          navigate('/'); 
        }, 2000);
      } else {
        setMessage(response.data.message || 'Error deleting account.');
      }
    } catch (error) {
      setMessage('Error deleting account: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="delete-account-page">
      <h2>Delete Account</h2>
      <form onSubmit={handleDeleteAccount}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="delete-btn">Delete Account</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Delete;
