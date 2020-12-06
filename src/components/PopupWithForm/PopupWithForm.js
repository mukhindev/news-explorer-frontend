import { useEffect } from 'react';
import BemHandler from '../../utils/bem-handler';
import './PopupWithForm.css';

const bem = new BemHandler('popup-with-form');

function PopupWithForm({
  title,
  isOpen,
  onClose,
  children,
  footer = null,
}) {
  const handleClose = () => {
    onClose();
  };

  const handleCloseByOverlay = (e) => {
    if (e.target.dataset.target === 'overlay') {
      handleClose();
    }
  };

  useEffect(() => {
    const handleCloseByEcs = (event) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleCloseByEcs);
    return () => document.removeEventListener('keydown', handleCloseByEcs);
  });

  if (!isOpen) return null;

  return (
    <div
      className={bem.get(null)}
      onMouseDown={handleCloseByOverlay}
      data-target="overlay"
    >
      <div className={bem.get('container')}>
        <button
          className={bem.get('close-button')}
          type="button"
          onClick={handleClose}
        />
        <h3 className={bem.get('title')}>{title}</h3>
        {children}
        {footer}
      </div>
    </div>
  );
}

export default PopupWithForm;
