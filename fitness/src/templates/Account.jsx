import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
  const { user } = UserAuth();
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const WEATHER_KEY = '030644053d0b4b67a4422926232504';
  const NUTR_KEY = '94648b58ab93bcdb0700cd98c3bd137b';

  const searchWeather = async () => {
    try {
      let url;
      if (Number.isInteger(parseInt(location))) {
        url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_KEY}&q=${location}`;
      } else {
        url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_KEY}&q=${location}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
      } else {
        setWeather(data);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching the weather information.');
    }
  };

  return (
    <div className='w-[300px] m-auto'>
      <div>
        <h2 style={{ marginLeft: '20px' }}>Welcome, {user?.displayName}</h2>
        <input style={{ marginLeft: '40px' }}
          type='text'
          placeholder='Enter city name or zip code'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={searchWeather}>Search</button>
        {error && <p style={{ color: 'red', marginLeft: '40px' }}>{error}</p>}
        {weather && (
          <div>
            <h3 style={{ marginLeft: '40px' }}>Weather in {weather.location.name}, {weather.location.country}</h3>
            <p style={{ marginLeft: '40px' }}>Temperature: {weather.current.temp_f}°F</p>
            <p style={{ marginLeft: '40px' }}>Feels like: {weather.current.feelslike_f}°F</p>
            <p style={{ marginLeft: '40px' }}>Condition: {weather.current.condition.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
