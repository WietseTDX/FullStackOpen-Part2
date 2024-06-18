import React from 'react';
import CountryFlag from './CountryFlag'
import Weather from './CountryWeather'

const CountryDetail = ({ country, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>Back to List</button>
      <h2>{country.name.common}</h2>
      <p>Official Name: {country.name.official}</p>
      <p>Capital: {country.capital && country.capital[0]}</p>
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Population: {country.population} people</p>
      <p><b>Languages:</b></p>
      <ul>
        {country.languages && Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <div>
        <CountryFlag flagsData={country.flags} />
      </div>
      <h1>Current weather in {country.capital && country.capital[0]}</h1>
      <div>
        {country.capital && <Weather cityName={country.capital[0]} />}
      </div>     
    </div>
  );
};

export default CountryDetail;
