import React from 'react';

const SearchBar = ({ query, onQueryChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country"
        value={query}
        onChange={onQueryChange}
      />
    </div>
  );
};

export default SearchBar;
