import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [room, setRoom] = useState('general');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    socket.on('user_typing', (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(''), 2000);
    });

    return () => {
      socket.off('receive_message');
      socket.off('user_typing');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const joinChat = async () => {
    if (!username.trim()) return;
    socket.emit('join_room', room);
    const res = await axios.get(`http://localhost:5000/api/messages/${room}`);
    setMessages(res.data);
    setJoined(true);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    const data = { sender: username, text: message, room };
    socket.emit('send_message', data);
    setMessage('');
  };

  const handleTyping = () => {
    socket.emit('typing', { room, sender: username });
  };

  if (!joined) {
    return (
      <div className="join-screen">
        <div className="join-box">
          <h1>💬 Join Chat</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <select value={room} onChange={(e) => setRoom(e.target.value)}>
            <option value="general">General</option>
            <option value="tech">Tech Talk</option>
            <option value="random">Random</option>
          </select>
          <button onClick={joinChat}>Join Chat</button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-app">
      <div className="chat-header">
        <h2># {room}</h2>
        <span>{username}</span>
      </div>

      <div className="messages-container">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender === username ? 'own' : ''}`}>
            <div className="message-bubble">
              <span className="sender">{msg.sender}</span>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {typingUser && typingUser !== username && (
          <p className="typing-indicator">{typingUser} is typing...</p>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => { setMessage(e.target.value); handleTyping(); }}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
