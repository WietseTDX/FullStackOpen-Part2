import React from 'react';

const CountryList = ({ countries, onSelect }) => {
  if (countries.length > 10) {
    return <p>Too many results, specify a filter</p>;
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => onSelect(country)}>Show Details</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
