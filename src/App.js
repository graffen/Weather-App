import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css'; 

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [background, setBackground] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=bdc1146c700b7ab3cbbd22c72a75063f`;

  const searchLocation = (event) => {
    if (event.key === "Enter" && location) {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error making the request", error);
        });
      setLocation('');
    }
  };

  const setWeatherBackgroundAndIcon = (data) => {
    const localTime = new Date((data.dt + data.timezone) * 1000);
    const hour = localTime.getUTCHours();
    const isDayTime = hour > 6 && hour < 18;
    const weather = data.weather[0].main.toLowerCase();

    let backgroundClass = '';
    let icon = '';

    switch (true) {
      case weather.includes("cloud"):
        backgroundClass = isDayTime ? 'cloudy-day' : 'cloudy-night';
        icon = 'cloud';
        break;
      case weather.includes("drizzle"):
        backgroundClass = isDayTime ? 'drizzle-day' : 'drizzle-night';
        icon = 'drizzle';
        break;
      case weather.includes("rain"):
        backgroundClass = isDayTime ? 'rainy-day' : 'rainy-night';
        icon = 'rain';
        break;
      case weather.includes("clear"):
        backgroundClass = isDayTime ? 'clear-day' : 'clear-night';
        icon = 'clear';
        break;
      case weather.includes("snow"):
        backgroundClass = isDayTime ? 'snowy-day' : 'snowy-night';
        icon = 'snow';
        break;
      case weather.includes("thunderstorm"):
        backgroundClass = isDayTime ? 'thunderstorm-day' : 'thunderstorm-night';
        icon = 'thunderstorm';
        break;
      default:
        backgroundClass = isDayTime ? 'default-day' : 'default-night';
        icon = 'default';
        break;
    }

    setBackground(backgroundClass);
    setWeatherIcon(icon);
  };

  useEffect(() => {
    if (data.weather) {
      setWeatherBackgroundAndIcon(data);
    }
  }, [data]);

  const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

  return (
    <div className={`app ${background}`}>
      <div className="search">
        <input
          type="text"
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}, {currentDate}</p>
          </div>
          <div className="temp">
            {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
          </div>
          <div className="description">
            {data.weather && (
              <>
                <p>{data.weather[0].main}</p>
                <img
                  src={`/assets/icons/${weatherIcon}.png`}
                  alt={data.weather[0].main}
                  className="weather-icon"
                />
              </>
            )}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main && (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              )}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main && <p className="bold">{data.main.humidity} %</p>}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind && (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              )}
              <p>Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;



