import { useState } from 'react';
import BemHandler from '../../utils/bem-handler';
import './Input.css';

const bem = new BemHandler('input');

function Input({
  type = 'text',
  placeholder = '',
  value,
  radius,
  underline,
  search,
  onChange,
  disabled,
  className: mix,
  noValidate,
  minLength,
  maxLength,
  required,
  customMessage,
  label,
}) {
  const [message, setMessage] = useState('');

  const handleInput = (e) => {
    onChange(e.target.value);
    const { valid } = e.target.validity;
    if (valid) {
      setMessage('');
    } else {
      setMessage(customMessage || e.target.validationMessage);
    }
  };

  return (
    <label
      className={bem.get(null, null, mix)}
    >
      {label && (
        <span className={bem.get('label')}>
          {label}
        </span>
      )}
      <input
        className={bem.get('field', {
          radius, underline, disabled, search,
        })}
        placeholder={placeholder}
        onChange={handleInput}
        type={type}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        noValidate={noValidate}
        value={value}
      />
      {message && !noValidate && (
        <span className={bem.get('message')}>
          {message}
        </span>
      )}
    </label>
  );
}

export default Input;
