import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faWind } from './fontAwesomeLibrary';
import './fontAwesomeLibrary';
import sunnyIcon from './icons/sun.png';
import cloudyIcon from './icons/cloudy.png';
import rainIcon from './icons/heavy-rain.png';
import snowIcon from './icons/snow.png';

function Weather({ data }) {

  const weatherCondition = data.weather[0].main.toLowerCase();

  let weatherIcon;
  switch (weatherCondition) {
    case 'clear':
      weatherIcon = <img src={sunnyIcon} alt="Sunny Icon" width="100" />;
      break;
    case 'clouds':
      weatherIcon = <img src={cloudyIcon} alt="Cloudy Icon" width="100" />;
      break;
    case 'rain':
      weatherIcon = <img src={rainIcon} alt="Rain Icon" width="100" />;
      break;
    case 'snow':
      weatherIcon = <img src={snowIcon} alt="Snow Icon" width="100" />;
      break;
    default:
      weatherIcon = <img src={sunnyIcon} alt="Sunny Icon" width="100" />; // Default icon
  }


  return (
    <>
      <div className="weatherSatusImage">{weatherIcon}</div>
      <p className="Temp">{Math.round(data.main.temp)}°C</p>
      <h2 className="name">{data.name}</h2>
      <div className="column">
        <div className="humidity">
          <div className="humidImage"><FontAwesomeIcon icon={faWater} /></div>
          <div className="humidText">
            <p id="humidNum">{data.main.humidity} %</p>
            <p className="humidName">Humidity</p>
          </div>
        </div>
        <div className="windSpeed">
          <div className="windSpeedImage"><FontAwesomeIcon icon={faWind} /></div>
          <div className="windSpeedText">
            <p id="windNum">{data.wind.speed} km/h</p>
            <p className="windName">Wind Speed</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;