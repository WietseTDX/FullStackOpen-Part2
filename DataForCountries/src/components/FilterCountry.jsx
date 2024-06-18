const filterCountries = (countries, query) => countries.filter(country =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
);

export default filterCountries