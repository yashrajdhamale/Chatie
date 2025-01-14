import React, { createContext, useEffect, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children, logedin }) => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        // Function to update the user's location in the database
        const updateLocationInDatabase = async (location) => {
            try {
                await fetch('https://backend-chatiee.onrender.com/userprofile/update-location', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include cookies if necessary
                    body: JSON.stringify(location),
                });
                console.log('Location updated in DB:', location);
            } catch (error) {
                console.error('Error updating location in DB:', error);
            }
        };

        // Watch the user's geolocation
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const currentLocation = { latitude, longitude };

                // Update the location state
                setLocation(currentLocation);

                // Update location in the database if the user is logged in
                if (logedin) {
                    updateLocationInDatabase(currentLocation);
                }
            },
            (error) => console.error('Error getting location:', error),
            { enableHighAccuracy: true } // Use high accuracy for location
        );

        // Cleanup: Stop watching location when the component unmounts
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, [logedin]); // Dependency array includes `logedin` to re-run when login state changes

    return (
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    );
};
