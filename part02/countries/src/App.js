import { useState, useEffect } from 'react';
import axios from 'axios';
import Content from './components/Content';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const filterCountries = () => {
    let filteredCountries = [];
    if (selectedCountry) {
      filteredCountries.push(selectedCountry);
    } else {
      filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter)
      );
    }
    return filteredCountries;
  };

  const shownCountries = filterCountries();

  const onSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  const loadCountriesHook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => setCountries(res.data));
  };

  useEffect(loadCountriesHook, []);

  return (
    <div className="App">
      <label htmlFor="filter">Find Countries</label>
      <input
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        type="text"
      />
      <Content
        countries={shownCountries}
        onSelectCountry={onSelectCountry}
      ></Content>
    </div>
  );
}

export default App;
