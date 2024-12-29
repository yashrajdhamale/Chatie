import React, { useState } from 'react';
import '../Style/Candidate.css';

const candidatesData = [
  { id: 1, name: 'John Doe', profile: 'J', hasNewMessages: true },
  { id: 2, name: 'Jane Smith', profile: 'J', hasNewMessages: false },
  { id: 3, name: 'Sam Brown', profile: 'S', hasNewMessages: true },
];

const chatsData = {
  1: [
    { sender: 'John Doe', message: 'Hi! How are you?', time: '2:00 PM' },
    { sender: 'You', message: 'I am doing well, thanks!', time: '2:05 PM' },
  ],
  2: [
    { sender: 'You', message: 'Hello Jane!', time: '3:00 PM' },
  ],
  3: [
    { sender: 'Sam Brown', message: 'Good afternoon!', time: '1:00 PM' },
  ],
};

export default function Candidate() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleCandidateClick = (candidateId) => {
    setSelectedCandidate(candidateId);
  };

  return (
    <div className="candidate-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        {candidatesData.map((candidate) => (
          <div
            key={candidate.id}
            className={`candidate-item ${selectedCandidate === candidate.id ? 'active' : ''}`}
            onClick={() => handleCandidateClick(candidate.id)}
          >
            <div className="profile-icon">
              {candidate.profile}
              {candidate.hasNewMessages && <span className="notification-dot"></span>}
            </div>
            <span className="candidate-name">{candidate.name}</span>
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        {selectedCandidate ? (
          <>
            <div className="chat-header">
              <h3>{candidatesData.find((candidate) => candidate.id === selectedCandidate)?.name}</h3>
            </div>
            <div className="chat-messages">
              {chatsData[selectedCandidate]?.map((chat, index) => (
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
          <div className="no-chat">Select a candidate to start chatting</div>
        )}
      </div>
    </div>
  );
}
