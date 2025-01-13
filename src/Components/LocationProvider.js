import React, { createContext, useEffect, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children, logedin }) => {
    const [location, setLocation] = useState(null);

    const haversineDistance = (coords1, coords2) => {
        const toRad = (value) => (value * Math.PI) / 180;

        const R = 6371000; // Earth's radius in meters
        const lat1 = toRad(coords1.latitude);
        const lon1 = toRad(coords1.longitude);
        const lat2 = toRad(coords2.latitude);
        const lon2 = toRad(coords2.longitude);

        const dLat = lat2 - lat1;
        const dLon = lon2 - lon1;

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    };

    useEffect(() => {
        let lastLocation = null; // Tracks the last significant location

        const updateLocationInDatabase = async (location) => {
            try {
                await fetch('https://backend-chatiee.onrender.com/userprofile/update-location', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(location),
                });
                console.log('Location updated in DB:', location);
            } catch (error) {
                console.error('Error updating location in DB:', error);
            }
        };

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const currentLocation = { latitude, longitude };

                if (lastLocation) {
                    const distance = haversineDistance(lastLocation, currentLocation);
                    // console.log('Distance Moved:', distance);

                    if (distance > 0) { // Update only if moved more than 2 meters
                        setLocation(currentLocation);
                        lastLocation = currentLocation; // Update last significant location
                        if (logedin) { updateLocationInDatabase(currentLocation); }
                    }
                } else {
                    // Set initial location
                    setLocation(currentLocation);
                    lastLocation = currentLocation;
                    if (logedin){updateLocationInDatabase(currentLocation);}
                    console.log('Initial Location:', currentLocation);
                }
            },
            (error) => console.error('Error getting location:', error),
            { enableHighAccuracy: true }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId); // Cleanup on component unmount
        };
    }, []);

    return (
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    );
};

