import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Update.css'; 

const Update = () => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.158.128:5000/api/auth/update-password', {
        username,
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        setMessage('Password updated successfully.');
        setTimeout(() => {
          navigate('/'); 
        }, 2000);
      } else {
        setMessage(response.data.message || 'Error updating password.');
      }
    } catch (error) {
      setMessage('Error updating password: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="update-password-page">
      <h2>Update Password</h2>
      <form onSubmit={handleUpdatePassword}>
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
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="update-btn">Update Password</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Update;
