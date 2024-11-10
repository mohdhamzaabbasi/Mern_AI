import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Chat.css';
import { useLocation } from 'react-router-dom';

function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { username} = location.state || {};
  const handleSendMessage = async () => {
    if (input) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);
      let inp="And Right now answer this query -->"+input;
      console.log(input);
      console.log("*****");

      const reqq = await axios.post('http://localhost:5000/api/get-requests', {
        username: username
      });
      let history="These are the past seraches of the user(seperated by comma), keep it in mind -->";
      let nn=reqq.data.requests.length;
      for(let i=0;i<nn;i++)
      {
        history=history+reqq.data.requests[i]+",";
      }
      history=history+inp;
      console.log(history);
      // Call the backend API to generate a recipe
      try {
        const response = await axios.post('http://localhost:5000/api/generate-recipe', {
          input_text: history,
        });

        const botMessage = {
          sender: 'bot',
          text: `Here’s your recipe: ${response.data.recipe}`,
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        const errorMessage = { sender: 'bot', text: 'Sorry, there was an error generating the recipe.' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
      try {
        const response = await axios.post('http://localhost:5000/api/save-request', {
          username, // Sending username as part of the request body
          input,
        });
      } catch (error) {
        const errorMessage = { sender: 'bot', text: 'Sorry, there was an error saving the prompt.' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } 
      setInput('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  useEffect(() => {
    const pastMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(pastMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="ChatPage">
      <div className="header">
        <h2>Welcome, {username} &nbsp;&nbsp; </h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="chat">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'userMessage' : 'botMessage'}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="inputArea">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your ingredients..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatPage;
