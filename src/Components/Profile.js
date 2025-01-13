import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile({ setLogedin }) {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const Navigate = useNavigate();

    const getProfile = async () => {
        try {
            const res = await fetch('https://backend-chatiee.onrender.com/userprofile/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to fetch profile');
            }

            const data = await res.json();
            setProfile(data);
        } catch (err) {
            console.error(err.message);
            setError(err.message); // Display error to the user
        }
    };

    const logout = async () => {
        try {
            const res = await fetch('https://backend-chatiee.onrender.com/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to logout');
            }

            setProfile(null);
            setError('');
            localStorage.removeItem('logedin');
            setLogedin(false);

            Navigate('/Chatie');
        } catch (err) {
            console.error(err.message);
            setError(err.message); // Display error to the user
        }
    }

    

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div>
            <h1>User Profile</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {profile ? (
                <div>
                    <p><strong>Name:</strong> {profile.firstname}</p>
                    <p><strong>Email:</strong> {profile.email}</p>

                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
