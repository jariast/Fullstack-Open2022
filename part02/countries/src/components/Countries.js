import React from 'react';

const Countries = ({ countries }) => {
  return (
    <>
      <ul>
        {countries.map((country) => (
          <li key={country.population}>{country.name.common}</li>
        ))}
      </ul>
    </>
  );
};

export default Countries;
