import BemHandler from '../../utils/bem-handler';
import './Button.css';

const bem = new BemHandler('button');

function Button({
  type = 'button',
  radius,
  outline,
  theme,
  onClick,
  children,
  disabled,
  className: mix,
  icon,
  iconComponent: Icon = () => null,
  caption = null,
}) {
  const modifiers = {
    type, radius, outline, theme, disabled, icon,
  };

  return (
    <button
      className={bem.get(null, modifiers, mix)}
      onClick={onClick}
      type={type}
      disabled={disabled}
      data-caption={caption}
    >
      { children }
      <Icon className={bem.get('icon')} />
    </button>
  );
}

export default Button;
