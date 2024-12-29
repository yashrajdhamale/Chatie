import React from 'react';
import '../Style/Notification.css';

export default function Notification() {
    const notifications = [
        "New message from Alex",
        "Your task is due tomorrow",
        "Meeting at 3 PM",
        "System update available",
    ];

    return (
        <div className="notification-dropdown">
            <h4>Notifications</h4>
            {notifications.length > 0 ? (
                <ul>
                    {notifications.map((note, index) => (
                        <li key={index}>{note}</li>
                    ))}
                </ul>
            ) : (
                <p>No new notifications</p>
            )}
        </div>
    );
}
