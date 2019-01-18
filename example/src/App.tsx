import * as React from 'react';
import './App.css';

import { useF8, peekValue } from 'formulate';
import F8TextInput from './F8TextInput';
import F8ErrorBox from './F8ErrorBox';

const initialForm = {
  name: 'jack',
  age: '1337',
  profile: {
    nick: 'dirak',
  },
};

const notBob = (name: string): string[] | null => {
  if (name.trim().toLowerCase() === 'bob') {
    return ['Bob is not allowed to submit this form'];
  }

  return null;
}

const onSubmit = (formData) => {
  console.log(JSON.stringify(peekValue(formData)));
};

const App = () => {
  const formData = useF8(initialForm);

  console.log(formData);

  return (
    <form className='App'>
      <F8ErrorBox link={formData} />
      <F8TextInput link={formData.name} label='name' validation={notBob} />
      <F8TextInput link={formData.age} label='age' />
      <F8TextInput link={formData.profile.nick} label='nick' />
      <button onClick={onSubmit}>Submit</button>

      {JSON.stringify(peekValue(formData))}
    </form>
  );
};

export default App;
