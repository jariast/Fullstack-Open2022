import React from 'react';

const Country = ({ country }) => {
  const getLangs = () => {
    const langs = [];
    const langObject = country.languages;
    for (const lang in langObject) {
      langs.push(<li key={lang}>{langObject[lang]}</li>);
    }
    return langs;
  };

  const languages = getLangs();
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>{languages}</ul>

      <img src={country.flags.png} alt={`${country.name.common} flag`} />
    </>
  );
};

export default Country;
