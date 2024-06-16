const PhonebookTable = ({ persons, deleteAction }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={() => deleteAction(person.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PhonebookTable;
