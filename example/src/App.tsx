import * as React from 'react';
import './App.css';

import { useF8, peekValue } from 'formulate';
import F8TextInput from './F8TextInput';

const initialForm = {
  name: 'jack',
  age: '1337',
  profile: {
    nick: 'dirak',
  },
};

const validateNotBob = (name: string) => {
  if (name.trim().toLowerCase() === 'bob') {
    return ['Bob is not allowed to submit this form'];
  }
}

const onSubmit = (formData) => {
  console.log(JSON.stringify(peekValue(formData)));
};

const App = () => {
  const formData = useF8(initialForm);

  return (
    <form className='App'>
      <F8TextInput link={formData.name} label='name' />
      <F8TextInput link={formData.age} label='age' />
      <F8TextInput link={formData.profile.nick} label='nick' />
      <button onClick={onSubmit}>Submit</button>

      {JSON.stringify(peekValue(formData))}
    </form>
  );
};

export default App;
