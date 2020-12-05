import { useState, useEffect } from 'react';
import BemHandler from '../../utils/bem-handler';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './PopupWithForm.css';

const bem = new BemHandler('popup-with-form');

function PopupWithForm({
  onSubmit,
  isOpen,
  onClose,
}) {
  const [method, setType] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleClose = () => {
    setType('');
    setEmail('');
    setPassword('');
    setName('');
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

  const signInForm = {
    fields: [
      {
        label: 'Email',
        type: 'email',
        placeholder: 'Введите почту',
        onChange: setEmail,
        validation: {
          required: true,
        },
      },
      {
        label: 'Пароль',
        type: 'password',
        placeholder: 'Введите пароль',
        onChange: setPassword,
        validation: {
          required: true,
          minLength: 5,
        },
      },
    ],
  };

  const signUoForm = {
    fields: [
      ...signInForm.fields,
      {
        label: 'Имя',
        type: 'text',
        placeholder: 'Введите своё имя',
        onChange: setName,
        validation: {
          required: true,
          minLength: 2,
        },
      },
    ],
  };

  const handleValid = (e) => {
    setIsValid(e.target.validity.valid);
  };

  const handleSubmit = () => {
    const user = {
      email,
      password,
      name,
    };
    onSubmit({ method, user });
  };

  const createField = ({
    label,
    type = 'text',
    placeholder = '',
    validation,
    onChange,
  }, index) => (
    <label className={bem.get('label')} key={index}>
      <span className={bem.get('label-span')}>
        {label}
      </span>
      <Input
        className={bem.get('input')}
        type={type}
        placeholder={placeholder}
        underline
        onChange={onChange}
        {...validation}
      />
    </label>
  );

  return (
    <div className={bem.get(null)}
      onClickCapture={handleCloseByOverlay}
      data-target="overlay"
    >
      <form
        onChange={handleValid}
        className={bem.get('form')}
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className={bem.get('close-button')}
          onClick={handleClose}
        />
        <h3 className={bem.get('title')}>
          {method === 'signin'
            ? 'Вход'
            : 'Регистрация'
          }
        </h3>
        {method === 'signin'
          ? signInForm.fields.map(createField)
          : signUoForm.fields.map(createField)
        }
        <Button
          className={bem.get('button')}
          disabled={!isValid}
          type="submit"
          radius="large"
        >
          {method === 'signin'
            ? 'Войти'
            : 'Зарегистрироваться'
          }
        </Button>
        <p className={bem.get('alternative')}>
          или&nbsp;
          {method === 'signin'
            ? (
              <span
                className={bem.get('alternative-span')}
                onClick={() => setType('signup')}>
                Зарегистрироваться
              </span>
            )
            : (
              <span
                className={bem.get('alternative-span')}
                onClick={() => setType('signin')}>
                  Войти
              </span>
            )
          }
        </p>
      </form>
    </div>
  );
}

export default PopupWithForm;
