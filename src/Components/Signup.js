import React, { useState } from 'react';
import '../Style/Signup.css';

import Loading from './Loading';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        setLoading(true);
        
        const res = await fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstname, lastname, email, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
            document.getElementById('signup-form').reset();
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Sign Up</h2>
                <form id="signup-form" className="signup-form">
                    <div className="form-group">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" id="firstname" placeholder="Enter your first name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" id="lastname" placeholder="Enter your last name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />
                    </div>
                    <button onClick={handleSignup} className="signup-button">Sign Up</button>
                </form>
                <p className="signup-footer">
                    {loading && <Loading />}
                    {!loading && <Link to='/login'>Already have an account? Login</Link>}
                </p>
            </div>
        </div>
    );
}
