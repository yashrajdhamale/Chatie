import React from 'react';
import { useState } from 'react';
import '../Style/Home.css'; // Assume you have some CSS for styling



export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [searching, setSearching] = useState(false);

  const Uri = process.env.URI;

  const handleSearch = () => {
    setSearching(true);
    // Mock fetching profiles - replace this with actual API call
    setTimeout(() => {
      const fetchProfiles = async () => {
        const response = await fetch('https://backend-chatiee.onrender.com/userprofile/get-profiles', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
        setProfiles(data);
      };
      fetchProfiles(); // Call the async function
      setSearching(false);
    }, 2000);

  };

  const handleRequestChat = (profile) => {
    alert(`Chat request sent to ${profile.name}`);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to chatie</h1>
      <p className="home-description">Connect with people around you anonymously and share conversations during your commute.</p>
      <button className="search-button" onClick={handleSearch} disabled={searching}>
        {searching ? 'Searching...' : 'Find Nearby Profiles'}
      </button>
      <div className="profiles-list">
        {profiles.length > 0 ? (
          profiles.map(profile => (
            <div key={profile._id} className="profile-card">
              <h3>{profile.firstname}</h3>
              <p>{profile.lastname}</p>
              <button className="chat-request-button" onClick={() => handleRequestChat(profile)}>
                Request Chat
              </button>
            </div>
          ))
        ) : (
          searching ? <p>Looking for nearby profiles...</p> : <p>No profiles found. Try searching again.</p>
        )}
      </div>
    </div>
  );
}
