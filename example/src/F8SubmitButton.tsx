import * as React from 'react';
import { useLink, Link } from 'formulate';

type Props<T> = {
  link: Link<T>,
  onClick: (formData: any) => void,
  children: string,
}



function F8SubmitButton<T>({link, onClick, children}: Props<T>) {
  const {value} = useLink(link);

  const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick(value);
  }

  return(
    <button type="submit" onClick={handleClick}>
      {children}
    </button>
  );
}

export default F8SubmitButton;