import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { Section } from './Section/Section';
import { Form } from './Form/Form';
import { Search } from './Search/Search';
import { Contacts } from './Contacts/Contacts';
import { StyledDiv } from './App.styled';
// import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

const LOCAL_KEY = 'LOCALKEY';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LOCAL_KEY)) || []
  );
  const [filter, setFilter] = useState('');

  const sendData = data => {
    const { name, number } = data;

    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number.toLowerCase() === number.toLowerCase()
      )
    ) {
      Notify.failure(`${name} or number ${number} is already in contacts`);
      return;
    }

    const newCustomer = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prevState => [...prevState, newCustomer]);
  };

  const filterValueHandler = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <StyledDiv>
      <Section title="Phonebook">
        <Form sendData={sendData} />
      </Section>
      <Section title="Contacts">
        <Search filter={filter} onChange={filterValueHandler} />

        <Contacts
          filterContacts={filterContacts()}
          deleteContact={deleteContact}
        />
      </Section>
    </StyledDiv>
  );
}
