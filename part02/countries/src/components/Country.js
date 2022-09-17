import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Weather from './Weather';

const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState();
  const api_key = process.env.REACT_APP_API_KEY;

  const getLangs = () => {
    const langs = [];
    const langObject = country.languages;
    // I'm still not sure this is a good practice, to "create" components in a function
    for (const lang in langObject) {
      langs.push(<li key={lang}>{langObject[lang]}</li>);
    }
    return langs;
  };

  const countryHook = () => {
    console.log('Selected Country in Country component: ', country);
    const lat = country.latlng[0];
    const lng = country.latlng[1];
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
      )
      .then((res) => setWeatherData(res.data));
  };
  useEffect(countryHook, [country, api_key]);

  const languages = getLangs();
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>{languages}</ul>

      <img src={country.flags.png} alt={`${country.name.common} flag`} />

      <Weather capital={country.capital} weatherData={weatherData}></Weather>
    </>
  );
};

export default Country;
