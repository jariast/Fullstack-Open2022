import { useState, useEffect } from 'react';
import axios from 'axios';
import Content from './components/Content';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const shownCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter)
  );

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
      <Content countries={shownCountries}></Content>
    </div>
  );
}

export default App;
