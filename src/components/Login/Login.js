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
  ];

  const handleSubmit = () => {
    onSubmit({
      email,
      password,
    });
  };

  return (
    <PopupWithForm
      title="Вход"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form
        fields={fields}
        buttonText="Войти"
        onSubmit={handleSubmit}
        onValid={onValid}
        message={formMessage}
        replacementFormText="Зарегистрироваться"
        onReplaceForm={onReplaceForm}
      />
    </PopupWithForm>
  );
}

export default Register;
