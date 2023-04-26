import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
  const { user } = UserAuth();
  const [location, setLocation] = useState('');
  const [foodInput, setFoodInput] = useState('');
  const [foodAmount, setFoodAmount] = useState('');
  const [weather, setWeather] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [nutritionError, setNutritionError] = useState(null);
  
  const WEATHER_KEY = '030644053d0b4b67a4422926232504';
  const NUTR_APP_ID = '8664018f'; 
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
        setWeatherError(data.error.message);
      } else {
        setWeather(data);
      }
    } catch (error) {
      console.error(error);
      setWeatherError('An error occurred while fetching the weather information.');
    }
  };
  
  const searchNutritionData = async () => {
    // Validate user input
    if (!foodAmount || !foodInput) {
      setNutritionError('Please enter a valid food item and amount.');
      return;
    }
  
    try {
      const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=${NUTR_APP_ID}&app_key=${NUTR_KEY}&ingr=${foodAmount}%20${foodInput}`);
      const data = await response.json();
      if (data.error) {
        setNutritionError(data.error.message);
      } else if (!data.totalNutrients || !data.totalNutrients.PROCNT || !data.totalNutrients.FAT || !data.totalNutrients.CHOCDF) {
        setNutritionError('Nutrient information is missing for this food item.');
      } else {
        setNutritionData(data);
  
        const nutritionInfo = {
          calories: data.calories,
          protein: data.totalNutrients.PROCNT.quantity,
          fat: data.totalNutrients.FAT.quantity,
          carbohydrates: data.totalNutrients.CHOCDF.quantity
        }
  
        const response = await fetch('/food', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // user_id: YOUR_USER_ID,
            food_items: [{
              name: foodInput,
              quantity: foodAmount,
              nutrition_info: nutritionInfo
            }]
          })
        });
  
        // Check the response from the backend
        const responseData = await response.json();
        console.log(responseData);
      }
    } catch (error) {
      console.error(error);
      setNutritionError('An error occurred while fetching the nutrition information.');
    }
  };

  return (
    <div className='w-[300px] m-auto'>
      <div>
        <h2 style={{ marginLeft: '20px' }}>Welcome, {user?.displayName}</h2>
        <p style={{ marginLeft: '40px' }}>Going for a run? Check the weather here!</p>
        <input style={{ marginLeft: '40px', width: '170px' }}
          type='text'
          placeholder='Enter city name or zip code'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={searchWeather}>Search</button>
        {weatherError && (
          <p style={{ color: 'red', marginLeft: '40px' }}>
            {weatherError}
            {weather && weatherError && setWeatherError(null)}
          </p>
        )}
        {weather && (
          <div>
            <h3 style={{ marginLeft: '40px' }}>Weather in {weather.location.name}, {weather.location.country}</h3>
            <p style={{ marginLeft: '40px' }}>Temperature: {weather.current.temp_f}°F | {weather.current.temp_c} °C</p>
            <p style={{ marginLeft: '40px' }}>Feels like: {weather.current.feelslike_f}°F | {weather.current.feelslike_c} °C</p>
            <p style={{ marginLeft: '40px' }}>Condition: {weather.current.condition.text}</p>
          </div>
        )}
        <hr />
        <div>
          <p style={{ marginLeft: '40px' }}>YourFitnessPRO's built in calorie counter can help you track and achieve certain calorie goals to lose weight.</p>
          <p style={{ marginLeft: '40px' }}>Lose weight with YourFitnessPRO!</p>
          <input style={{ marginLeft: '40px' }}
            type='text'
            placeholder='Enter food'
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
          />
          <br />
          <br />
          <input style={{ marginLeft: '40px' }}
            type='text'
            placeholder='Enter amount in grams'
            value={foodAmount}
            onChange={(e) => setFoodAmount(e.target.value)}
          />
          <br />
          <br />
          <button style={{ marginLeft: '40px' }} onClick={searchNutritionData}>Get Nutrition Data</button>
          {nutritionError && (
            <p style={{ color: 'red', marginLeft: '40px' }}>
              {nutritionError}
              {nutritionData && nutritionError && setNutritionError(null)}
            </p>
          )}
          {nutritionData && (
            <div>
              <h3 style={{ marginLeft: '40px' }}>{nutritionData.totalWeight}g {foodInput} Nutrition Info:</h3>
              <p style={{ marginLeft: '40px' }}>Calories: {nutritionData.calories}</p>
              <p style={{ marginLeft: '40px' }}>Protein: {nutritionData.totalNutrients.PROCNT.quantity.toFixed(2)} {nutritionData.totalNutrients.PROCNT.unit}</p>
              <p style={{ marginLeft: '40px' }}>Fat: {nutritionData.totalNutrients.FAT.quantity.toFixed(2)} {nutritionData.totalNutrients.FAT.unit}</p>
              <p style={{ marginLeft: '40px' }}>Carbohydrates: {nutritionData.totalNutrients.CHOCDF.quantity.toFixed(2)} {nutritionData.totalNutrients.CHOCDF.unit}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;

