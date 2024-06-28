import { useEffect, useState } from 'react';
import InputForm from './components/InputForm';
import SearchBar from './components/SearchBar';
import PhonebookTable from './components/PhonebookTable';
import Notification from './components/Notification'

import PhonebookServer from './service/PhonebookServer';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '06-12345678', id: "0" }]);
  const [query, setQuery] = useState('');
  const [notificationContent, setNotificationContent] = useState({message: null, error: false});

  useEffect(() => {
    PhonebookServer.getAll()
      .then(response => setPersons(response))
  }, [])

  const alreadyPresent = (name, array) => {
    return array.some((person) => person.name === name);
  };

  const updatePersonNumber = (name, number) => {
    const updatedEntry = { ...persons.find((person) => person.name === name), number: number.toString() }
    PhonebookServer
      .update(updatedEntry.id, updatedEntry)
      .then(response => {
        setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id !== response.id ? person : response
          )
        );
      })
      .catch(response => {  // eslint-disable-line no-unused-vars
        setPersons(persons.filter(person => person.id !== updatedEntry.id))
        showNotification(`Information of ${name} has been removed from the server`, true);
      })
  }

  const handleNewEntry = (name, number) => {
    if (alreadyPresent(name, persons)) {
      if (window.confirm(`${name} is already in the phonebook, replace the old number with a new one?`)) {
        updatePersonNumber(name, number);
        showNotification(`Number of ${name} updateded`, false);
        return 0;
      } else {
        showNotification(`No update to ${name} record`, false);
        return 1;
      }
    }
    if (number.trim().length === 0) {
      showNotification("The number field is empty", true);
      return 2;
    }
    const newPerson = {
      name,
      id: (persons.length > 0 ? parseInt(persons[persons.length - 1].id) + 1 : 0).toString(),
      number,
    };
    PhonebookServer
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response));
        showNotification(`Succesfully added ${response.name}`, false);
      })
      .catch(response => showNotification(`Could not add ${newPerson.name}, no connection`, true)); // eslint-disable-line no-unused-vars
    return 0;
  };

  const deleteAction = (id) => {
    if (window.confirm(`Do you really want to remove ${persons.find(person => person.id === id).name}`)) {
      PhonebookServer
        .deletePerson(id)
        .then(data => {
          setPersons(persons.filter(person => person.id !== data.id))
          showNotification(`Succesfully removed ${data.name}`, false);
        })
        .catch(data => {  // eslint-disable-line no-unused-vars
          showNotification(`Succesfully removed ${persons.find(person => person.id === id).name}`, false);
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const showNotification = (message, error=false, timeOut=3000) => {
    setNotificationContent({message, error});
    setTimeout(() => {
      setNotificationContent({ message: null, error: false });
    }, timeOut);
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
      <Notification data={notificationContent} />
      <InputForm onSubmit={handleNewEntry} />
      <h2>Numbers</h2>
      <SearchBar query={query} onQueryChange={setQuery} />
      <PhonebookTable persons={queryData} deleteAction={deleteAction} />
    </div>
  );
}

export default App
