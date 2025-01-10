import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Components/Admin.js';
import Candidate from './Components/Candidate.js';
import Nav from './Components/Nav.js';
import Footer from './Components/Footer.js';
import Home from './Components/Home.js';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';
import { useState } from 'react';

function App() {
  const [logedin, setLogedin] = useState(false);
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/Chatie" element={<Home />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path='/login' element={<Login setLogedin={setLogedin} />} />
        {/* <Route path="/candidate" element={<Candidate />} /> */}
        <Route path="/footer" element={<Footer />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
