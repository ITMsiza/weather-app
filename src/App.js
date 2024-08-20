import React, { useState } from 'react';
import Weather from './Weather';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData,setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    const apiKey = "999ea1f6b1ea767b8108ee855436d4af";
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <section className="Body">
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input type="text" value={city} onChange={handleInputChange} placeholder="Search" />
          <button type="submit">Q</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && <Weather data={weatherData} />}
      </div>
    </section>  
   
  );
}

export default App;