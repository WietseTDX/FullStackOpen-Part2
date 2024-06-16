import { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const Neededaction = onSubmit(newName, newNumber);
    if (Neededaction !== 2) setNewName('');             // No reset name field when number is empty
    setNewNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default InputForm;
