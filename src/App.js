import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "./components/Container";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [background, setBackground] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  const getWeatherData = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=bdc1146c700b7ab3cbbd22c72a75063f`;

    axios.get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error making the request", error);
      });
  };

  const searchLocation = (event) => {
    if (event.key === "Enter" && location) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=bdc1146c700b7ab3cbbd22c72a75063f`;

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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherData(lat, lon);
        setCurrentLocation('Your Location');
      }, (error) => {
        console.error("Error getting the location", error);
        const defaultLat = 51.5074; 
        const defaultLon = -0.1278; 
        getWeatherData(defaultLat, defaultLon);
        setCurrentLocation('London');
      });
    } else {
        const defaultLat = 51.5074; 
        const defaultLon = -0.1278; 
        getWeatherData(defaultLat, defaultLon);
        setCurrentLocation('London');
    }
  }, []);

  useEffect(() => {
    if (data.weather) {
      setWeatherBackgroundAndIcon(data);
    }
  }, [data]);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'short' 
  });

  return (
    <div className={`app ${background}`}>
      <SearchBar
        location={location}
        setLocation={setLocation}
        searchLocation={searchLocation}
      />
      <Container
        data={data}
        currentLocation={currentLocation}
        currentDate={currentDate}
        weatherIcon={weatherIcon}
      />
    </div>
  );
}

export default App;
