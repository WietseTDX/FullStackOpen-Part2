import { useState } from 'react';
import InputForm from './components/InputForm';
import SearchBar from './components/SearchBar';
import PhonebookTable from './components/PhonebookTable';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '06-12345678', id: 0 }]);
  const [query, setQuery] = useState('');

  const AlreadyPresent = (name, array) => {
    return array.some((person) => person.name === name);
  };

  const handleNewEntry = (name, number) => {
    if (AlreadyPresent(name, persons)) {
      alert(`${name} is already in the book`);
      return 1;
    }
    if (number.trim().length === 0) {
      alert('The number field is empty');
      return 2;
    }
    const newPerson = {
      name,
      id: persons.length > 0 ? persons[persons.length - 1].id + 1 : 0,
      number,
    };
    setPersons(persons.concat(newPerson));
    return 0;
  };

  const queryData = persons.filter((person) => {
    if (query === '') {
      return person;
    } else if (person.name.toLowerCase().includes(query.toLowerCase())) {
      return person;
    }
    return false;
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <InputForm onSubmit={handleNewEntry} />
      <h2>Numbers</h2>
      <SearchBar query={query} onQueryChange={setQuery} />
      <PhonebookTable persons={queryData} />
    </div>
  );
}

export default App
