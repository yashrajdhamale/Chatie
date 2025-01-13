import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import '../Style/Nav.css';
import Notification from './Notification';
import { Link } from 'react-router-dom';

export default function Nav({ logedin }) {
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };

    return (
        <header className="nav-header">
            <div className="nav-left">
                <Link to='/Chatie' className="nav-link">
                    <span className="app-name">Chatie</span>
                </Link>
            </div>
            <div className="nav-right">
                <div className="notification-icon" onClick={toggleNotifications}>
                    <FaBell />
                </div>
                {showNotifications && <Notification />}
                <div className="login-button-nav" >
                    {!logedin && <Link to='/login'><button>Login</button></Link>}
                    {logedin && <Link to='/profile'><button>Profile</button></Link>}
                </div>
            </div>
        </header>
    );
}
