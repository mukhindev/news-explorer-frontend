import BemHandler from '../../utils/bem-handler';
import './Input.css';

const bem = new BemHandler('input');

function Input({
  type = 'text',
  placeholder = '',
  radius,
  underline,
  value,
  onChange,
  disabled,
  className: mix,
  required,
}) {
  const handleInput = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={bem.get(null, { radius, underline, disabled }, mix)}
      placeholder={placeholder}
      onChange={handleInput}
      value={value}
      type={type}
      disabled={disabled}
      minLength={2}
      required={required}
    />
  );
}

export default Input;
