import React from 'react';

const Countries = ({ countries, selectCountryHandler }) => {
  return (
    <>
      <ul>
        {countries.map((country) => (
          <li key={country.population}>
            <p>{country.name.common}</p>
            <button onClick={() => selectCountryHandler(country)}>
              Show this country
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Countries;
