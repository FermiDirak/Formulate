import * as React from 'react';
import { useLink, Link } from 'formulate';

type Props = {
  link: Link<any>,
  onClick: (formData: any) => void,
  children: string,
}



const F8SubmitButton = ({link, onClick, children}: Props) => {
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