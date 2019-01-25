import * as React from 'react';

type Props = {
  onClick?: () => void,
  type?: string,
  children: string,
}

const Button = ({onClick, type, children}: Props) => {
  const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick && onClick();
  }

  return (
    <button type={type} onClick={handleClick}>{children}</button>
  );
}

export default Button;
