import React, { useState } from 'react';
import Weather from './Weather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sunnyIcon from './icons/sun.png';
import { faWater, faWind, faMagnifyingGlass } from './fontAwesomeLibrary';
import './fontAwesomeLibrary';
import './App.css';


function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [temp, setTemp] = useState(17);
  const [name, setName] = useState('Pretoria');
  const [humidity, setHumidity] = useState(25);
  const [windSpeed, setWindSpeed] = useState(4.25);

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
    setTemp("");
    setName("");
    setHumidity("");
    setWindSpeed("");
  };

  return (
    <section className="Body">
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input type="text" value={city} onChange={handleInputChange} placeholder="Search" />
          <button className='btn' type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData ? (
          <Weather data={weatherData} />
        ) : (
          <div className={(loading || error) && 'Loading'}>
            <div className="weatherSatusImage"><img src={sunnyIcon} alt="Sunny Icon" width="100" /></div>
            <p className="Temp">{temp}°C</p>
            <h2 className="name">{name}</h2>
            <div className="columnDemo">
              <div className="humidityDemo">
                <div className="humidImage"><FontAwesomeIcon icon={faWater} /></div>
                <div className="humidText">
                  <p id="humidNum">{humidity} %</p>
                  <p className="humidName">Humidity</p>
                </div>
              </div>
              <div className="windSpeedDemo">
                <div className="windSpeedImage"><FontAwesomeIcon icon={faWind} /></div>
                <div className="windSpeedText">
                  <p id="windNum">{windSpeed} km/h</p>
                  <p className="windName">Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>

  );
}

export default App;