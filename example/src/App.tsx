import * as React from 'react';
import { useF8, peekValue } from 'formulate';
import Button from './Button';
import F8TextInput from './F8TextInput';
import F8ErrorBox from './F8ErrorBox';
import F8SubmitButton from './F8SubmitButton';

const initialForm = {
  name: 'dr hammer fish',
  age: '1337',
  profile: {
    nick: 'dirak',
  },
  friends: ['jack', 'jill'],
};

const notBob = (name: string): string[] | null => {
  if (name.trim().toLowerCase() === 'bob') {
    return ['Bob is not allowed to submit this form'];
  }

  return null;
}

const onSubmit = (formData) => {
  console.log(JSON.stringify(formData));
};

const App = () => {
  const formData = useF8(initialForm);

  return (
    <form className='App'>
      <F8ErrorBox link={formData} />
      <F8TextInput link={formData.name} label='name' validator={notBob} />
      <F8TextInput link={formData.age} label='age' />
      <F8TextInput link={formData.profile.nick} label='nick' />

      <section className='row'>
        {formData.friends.map((friend, i) => (
          <div key={i}>
            <F8TextInput link={friend} label={`friend ${i + 1}`}/>
            <Button>Remove Friend</Button>
          </div>
        ))}
      </section>

      <Button>Add Friend</Button>

      <F8SubmitButton link={formData} onClick={onSubmit}>Submit</F8SubmitButton>

      {JSON.stringify(peekValue(formData))}
    </form>
  );
};

export default App;
