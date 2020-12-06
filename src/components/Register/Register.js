import { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Form from '../Form/Form';

function Register({
  isOpen,
  onSubmit,
  onValid,
  onClose,
  onReplaceForm,
  formMessage,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const fields = [
    {
      label: 'Email',
      type: 'email',
      placeholder: 'Введите почту',
      onChange: setEmail,
      validation: {
        required: true,
      },
      customMessage: 'Неправильный формат email',
    },
    {
      label: 'Пароль',
      type: 'password',
      placeholder: 'Введите пароль',
      onChange: setPassword,
      validation: {
        required: true,
        minLength: 8,
      },
      customMessage: 'Нужно минимум 8 символов',
    },
    {
      label: 'Имя',
      type: 'text',
      placeholder: 'Введите своё имя',
      onChange: setName,
      validation: {
        required: true,
        minLength: 2,
      },
      customMessage: 'Нужно минимум 2 символа',
    },
  ];

  const handleSubmit = () => {
    onSubmit({
      email,
      password,
      name,
    });
  };

  return (
    <PopupWithForm
      title="Регистрация"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form
        fields={fields}
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
        onValid={onValid}
        message={formMessage}
        replacementFormText="Войти"
        onReplaceForm={onReplaceForm}
      />
    </PopupWithForm>
  );
}

export default Register;
