import React from 'react';
import '../Style/Login.css';
import { useState } from 'react';
import Loading from './Loading';
import { Link ,useNavigate} from 'react-router-dom';
export default function Login({setLogedin}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const Navigate = useNavigate();

    const CheckCradentials = async (e) => {
        e.preventDefault();
    
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        setLoading(true);
    
        const res = await fetch('https://backend-chatiee.onrender.com/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            credentials: 'include', 
            body: JSON.stringify({ email, password }),
        });
    
        const data = await res.json();    
        setLoading(false);
    
        if (data.error) {
            setError(data.error);
            // alert(data.error);
        } else {
            setError('');
            localStorage.setItem('logedin', true);
            setLogedin(true);
            Navigate('/Chatie');
            // alert(data.message);
        }
    
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    };
    

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <form className="login-form" onSubmit={CheckCradentials}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />
                    </div>
                    <button type='submit' className="login-button">Login</button>
                    {/* do not use onclick because it prevents the default form validations instead user type 'submit' and onSubmit in form*/}
                </form>
                <div className="login-footer">

                    {loading && <Loading />}
                    {!loading && <Link to='/signup'>Create User</Link>}
                </div>
            </div>
        </div>
    );
}
