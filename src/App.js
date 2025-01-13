import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './Components/Admin.js';
import Candidate from './Components/Candidate.js';
import Nav from './Components/Nav.js';
import Footer from './Components/Footer.js';
import Home from './Components/Home.js';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';
import { useEffect, useState } from 'react';
import Profile from './Components/Profile.js';
import { LocationProvider } from './Components/LocationProvider.js';

function App() {
  const [logedin, setLogedin] = useState(false);


  const checkLogedin = () => {
    if (localStorage.getItem('logedin')) {
      setLogedin(true);

    }
  }

  useEffect(() => {
    checkLogedin();
  }, []);

  return (
    <LocationProvider logedin={logedin} >
      <Router>
        <Nav logedin={logedin} />
        <Routes>
          <Route path="/Chatie" element={<Home />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
          <Route path='/login' element={<Login setLogedin={setLogedin} />} />
          {/* <Route path="/candidate" element={<Candidate />} /> */}
          <Route path="/footer" element={<Footer />} />
          {!logedin ? (
            <Route path="/signup" element={<Signup />} />
          ) : (
            <Route path="/signup" element={<Navigate to="/Chatie" />} />
          )}
          {logedin ? (
            <Route path='/profile' element={<Profile setLogedin={setLogedin} />} />
          ) : (
            <Route path='/profile' element={<Navigate to="/Chatie" />} />
          )}
        </Routes>
        <Footer />
      </Router>
    </ LocationProvider>
  );
}

export default App;
