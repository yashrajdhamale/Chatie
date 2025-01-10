import React from 'react';
import '../Style/Login.css';
import { useState } from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';

export default function Login({ setLogedin }) {

    const [loading, setLoading] = useState(false);

    const CheckCradentials = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        setLoading(true);
        const res = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.error) {
            alert(data.error);
        } else {
            setLogedin(true);
            alert(data.message);
        }

        document.getElementById('email').value = '';
        document.getElementById('password').value = '';


    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />
                    </div>
                    <button onClick={CheckCradentials} className="login-button">Login</button>

                </form>
                <p className="login-footer">

                    {loading && <Loading />}
                    {!loading && <Link to='/signup'>Create User</Link>}
                </p>
            </div>
        </div>
    );
}
