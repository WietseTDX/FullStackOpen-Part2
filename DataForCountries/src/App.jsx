import { useState, useEffect } from 'react'
import CountryAPI from './service/CountryServer';

import SearchModule from './components/SearchBar';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import filterCountries from './components/FilterCountry';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  useEffect(() => {
    CountryAPI.getAll().then(response => {
      setCountries(response);
    })
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    const filteredCountries = filterCountries(countries, query)
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0])
    } else if (filteredCountries.length >= 0) {
      setSelectedCountry(null)
    }
  }, [query, countries])

  return (
    <div>
      <h1>Country Search</h1>
      <SearchModule query={query} onQueryChange={handleQueryChange} />
      {(selectedCountry) ? (
        <CountryDetail country={selectedCountry} onBack={() => setSelectedCountry(null)} />
      ) : (
        <CountryList countries={filterCountries(countries, query)} onSelect={handleCountrySelect} />
      )}
    </div>
  );
}

export default App
