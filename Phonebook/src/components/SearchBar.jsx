const SearchBar = ({ query, onQueryChange }) => {
  return (
    <div>
      search: <input onChange={(event) => onQueryChange(event.target.value)} value={query} />
    </div>
  );
};

export default SearchBar;
