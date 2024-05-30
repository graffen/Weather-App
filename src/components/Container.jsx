import React from "react";
import "./Container.css";

const Container = ({ data, currentLocation, currentDate, weatherIcon }) => {
  return (
    <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.name || currentLocation}{data.name && ', '}{currentDate}</p>
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
  );
};

export default Container;
