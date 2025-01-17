import React from 'react';
import '../components/Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btnn--primary', 'btnn--outline', 'btnn--test'];

const SIZES = ['btnn--medium', 'btnn--large'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <>
      <button
        className={`btnn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
  </>
  );
};