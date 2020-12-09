import PopupWithForm from '../PopupWithForm/PopupWithForm';
import BemHandler from '../../utils/bem-handler';
import './Info.css';

const bem = new BemHandler('info');

function Info({
  isOpen,
  onClose,
  title,
  linkText,
  onClick,
}) {
  return (
    <PopupWithForm
      title={title}
      isOpen={isOpen}
      onClose={onClose}
    >
      {linkText && (
        <span
          className={bem.get('')}
          onClick={onClick}
        >
          {linkText}
        </span>
      )}
    </PopupWithForm>
  );
}

export default Info;
