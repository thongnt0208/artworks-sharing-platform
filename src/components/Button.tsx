import React from 'react';
import { Button } from 'primereact/button';

type ButtonProps = {
  text: string;
  icon: string;
  onClick?: () => void;
  disabled?: boolean;
};

const DefaultButton: React.FC<ButtonProps> = ({ text, icon, onClick, disabled = false }) => {

  return (
    <Button label={text} icon={icon} onClick={onClick} disabled={disabled} />
  );
};

export default DefaultButton;