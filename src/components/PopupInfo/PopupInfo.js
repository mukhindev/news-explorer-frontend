import PopupWithForm from '../PopupWithForm/PopupWithForm';
import BemHandler from '../../utils/bem-handler';
import './PopupInfo.css';

const bem = new BemHandler('popup-info');

function PopupInfo({
  isOpen,
  onClose,
  title,
  linkText,
  onLinkClick,
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
          onClick={onLinkClick}
        >
          {linkText}
        </span>
      )}
    </PopupWithForm>
  );
}

export default PopupInfo;
