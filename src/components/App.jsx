import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { Section } from './Section/Section';
import { Form } from './Form/Form';
import { Search } from './Search/Search';
import { Contacts } from './Contacts/Contacts';
import { StyledDiv } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, deleteUsers } from 'store/users/usersSlice';
import { setFilter } from 'store/filter/filterSlice';
import { getFilter } from 'store/filter/filterSelector';
import { getUser } from 'store/users/usersSelector';

export function App() {
  const contacts = useSelector(getUser);
  console.log(contacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

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

    dispatch(setUsers(newCustomer));
    // setContacts(prevState => [...prevState, newCustomer]);
  };

  const filterValueHandler = event => {
    const { value } = event.target;
    dispatch(setFilter(value));
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    dispatch(deleteUsers(id));
    // setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  // }, [contacts]);

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
