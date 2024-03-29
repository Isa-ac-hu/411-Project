import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { auth } from '../firebase';

const Account = () => {
  const { user } = UserAuth();
  const [location, setLocation] = useState('');
  const [foodInput, setFoodInput] = useState('');
  const [foodAmount, setFoodAmount] = useState('');
  const [foodUnit, setFoodUnit] = useState('');
  const [weather, setWeather] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [nutritionError, setNutritionError] = useState(null);
  const uid = auth.currentUser ? auth.currentUser.uid : null;
  
  const searchWeather = async () => {
    try {
      const response = await fetch(`/weather?location=${location}`);
      const data = await response.json();
      if (data.error) {
        setWeatherError(data.error);
      } else {
        setWeather(data);
        setWeatherError(null); // reset error to null
      }
    } catch (error) {
      console.error(error);
      setWeatherError('An error occurred while fetching the weather information.');
    }
  };  
  
  const searchNutritionData = async () => {
    // Validate user input
    if (!foodAmount || !foodInput || !foodUnit) {
      setNutritionError('Please enter a valid food item, amount, and unit of measurement.');
      return;
    }
  
    try {
      const response = await fetch('/nutrition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid,
          foodAmount,
          foodInput,
          foodUnit
        })
      });
      const data = await response.json();
      if (data.error) {
        setNutritionError(data.error.message);
        setNutritionData(null); 
      } else {
        setNutritionData(data.nutrition_info);
        setNutritionError(null); 
  
        const nutritionInfo = {
          calories: data.nutrition_info.calories,
          protein: data.nutrition_info.protein,
          fat: data.nutrition_info.fat,
          carbohydrates: data.nutrition_info.carbohydrates
        }
        console.log(nutritionInfo);
      }
    } catch (error) {
      console.error(error);
      setNutritionError('An error occurred while fetching the nutrition information.');
      setNutritionData(null);
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
          </p>
        )}
        {weather && (
          <div>
            <h3 style={{ marginLeft: '40px' }}>Weather in {weather.location.name}, {weather.location.country}</h3>
            <p style={{ marginLeft: '40px' }}>Temperature: {weather.current.temp_f}°F | {weather.current.temp_c}°C</p>
            <p style={{ marginLeft: '40px' }}>Feels like: {weather.current.feelslike_f}°F | {weather.current.feelslike_c}°C</p>
            <p style={{ marginLeft: '40px' }}>Condition: {weather.current.condition.text}</p>
          </div>
        )}
        <hr />
        </div>
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
          placeholder='Enter amount'
          value={foodAmount}
          onChange={(e) => setFoodAmount(e.target.value)}
        /> 
        <br />
        <br />
        <input style={{ marginLeft: '40px' }}
          type='text'
          placeholder='Enter unit'
          value={foodUnit}
          onChange={(e) => setFoodUnit(e.target.value)}
        /> 
        <br />
        <br />
        <button style={{ marginLeft: '40px' }} onClick={searchNutritionData}>Submit Food!</button>
        {nutritionError && (
          <p style={{ color: 'red', marginLeft: '40px' }}>
            {nutritionError}
          </p>
        )}
        {nutritionData && (
          <div>
            <h3 style={{ marginLeft: '40px' }}>Nutrition information for {foodInput} ({foodAmount}) {foodUnit}</h3>
            <p style={{ marginLeft: '40px' }}>Calories: {nutritionData.calories}</p>
            <p style={{ marginLeft: '40px' }}>Protein: {nutritionData.protein}g</p>
            <p style={{ marginLeft: '40px' }}>Fat: {nutritionData.fat}g</p>
            <p style={{ marginLeft: '40px' }}>Carbohydrates: {nutritionData.carbohydrates}g</p>
          </div>
        )}
      </div>
    </div>
  );}
export default Account;

