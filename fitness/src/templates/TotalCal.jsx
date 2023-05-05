import React, { useState, useEffect, useCallback } from 'react';
import { auth } from '../firebase';

const TotalCal = () => {
    const [totalCalories, setTotalCalories] = useState(null);
    const [error, setError] = useState(null);
    const uid = auth.currentUser ? auth.currentUser.uid : null;

    const getTotalCalories = useCallback(async () => {
        try {
            const response = await fetch(`/totalCalories?uid=${uid}`);
            if (!response.ok) {
                setError('You have not recorded any information today');
                return;
            }
            const data = await response.json();
            setTotalCalories(data.total_calories);
            setError(null); 
        } catch (error) {
            console.error(error);
            setError('An error occurred while fetching the calorie information.');
        }
      }, [uid]);      

    useEffect(() => {
        getTotalCalories();
    }, [getTotalCalories]);

    return (
        <main>
            <h1>Total Calories</h1>
            {totalCalories && (
                <p>You have consumed a total of {totalCalories} calories today.</p>
            )}
            {error && (
            <p style={{ color: 'red', marginLeft: '40px' }}>
                {error}
            </p>
            )}
        </main>
    );
};

export default TotalCal;
