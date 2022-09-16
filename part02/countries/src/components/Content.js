import React from 'react';
import Countries from './Countries';
import Country from './Country';

const Content = ({ countries, onSelectCountry }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]}></Country>;
  } else if (countries.length > 0 && countries.length < 10) {
    return (
      <Countries
        countries={countries}
        selectCountryHandler={onSelectCountry}
      ></Countries>
    );
  } else if (countries.length === 0 || countries.length > 10) {
    return <div>Please search for a country</div>;
  }
};

export default Content;
