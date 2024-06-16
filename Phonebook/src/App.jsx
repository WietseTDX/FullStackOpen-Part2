import { useEffect, useState } from 'react';
import InputForm from './components/InputForm';
import SearchBar from './components/SearchBar';
import PhonebookTable from './components/PhonebookTable';

import PhonebookServer from './service/PhonebookServer';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '06-12345678', id: "0" }]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    PhonebookServer.getAll()
      .then(response => setPersons(response))
  }, [])

  const alreadyPresent = (name, array) => {
    return array.some((person) => person.name === name);
  };

  const handleNewEntry = (name, number) => {
    if (alreadyPresent(name, persons)) {
      alert(`${name} is already in the book`);
      return 1;
    }
    if (number.trim().length === 0) {
      alert('The number field is empty');
      return 2;
    }
    const newPerson = {
      name,
      id: (persons.length > 0 ? parseInt(persons[persons.length - 1].id) + 1 : 0).toString(),
      number,
    };
    PhonebookServer
      .create(newPerson)
      .then(response => setPersons(persons.concat(response)))
    return 0;
  };

  const deleteAction = (id) => {
    if (window.confirm(`Do you really want to remove ${persons.find(person => person.id === id).name}`)) {
      PhonebookServer
        .deletePerson(id)
        .then(data => setPersons(persons.filter(person => person.id !== data.id)))
        .catch(data => {  // eslint-disable-line no-unused-vars
          setPersons(persons.filter(person => person.id !== id))
          console.log("Data was already gone from the server")
        })
    }
  }

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
      <PhonebookTable persons={queryData} deleteAction={deleteAction} />
    </div>
  );
}

export default App
