import React from "react";

const Weather = ({ capital, weatherData }) => {
  if (weatherData) {
    return (
      <>
        <h2>Weather in {capital}</h2>
        <p>Temperature: {weatherData.main.temp}c</p>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
        ></img>
        <p>Wind: {weatherData.wind.speed}m/s</p>
      </>
    );
  } else {
    return <p>Loading weatherData</p>;
  }
};

export default Weather;
