import React, { useState } from 'react';
import '../Style/Admin.css';

const usersData = [
  { id: 1, name: 'Alice', profile: 'A', hasNewMessages: true },
  { id: 2, name: 'Bob', profile: 'B', hasNewMessages: false },
  { id: 3, name: 'Charlie', profile: 'C', hasNewMessages: true },
];

const chatsData = {
  1: [
    { sender: 'Alice', message: 'Hey there!', time: '10:00 AM' },
    { sender: 'You', message: 'Hi Alice!', time: '10:05 AM' },
  ],
  2: [
    { sender: 'You', message: 'Hello Bob!', time: '11:00 AM' },
  ],
  3: [
    { sender: 'Charlie', message: 'Good Morning!', time: '9:00 AM' },
  ],
};

export default function Admin() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
  };

  return (
    <div className="admin-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        {usersData.map((user) => (
          <div
            key={user.id}
            className={`user-item ${selectedUser === user.id ? 'active' : ''}`}
            onClick={() => handleUserClick(user.id)}
          >
            <div className="profile-icon">
              {user.profile}
              {user.hasNewMessages && <span className="notification-dot"></span>}
            </div>
            <span className="user-name">{user.name}</span>
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <h3>{usersData.find((user) => user.id === selectedUser)?.name}</h3>
            </div>
            <div className="chat-messages">
              {chatsData[selectedUser]?.map((chat, index) => (
                <div key={index} className={`chat-message ${chat.sender === 'You' ? 'sent' : 'received'}`}>
                  <span className="message-text">{chat.message}</span>
                  <span className="message-time">{chat.time}</span>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input type="text" placeholder="Type a message" />
              <button>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
}
