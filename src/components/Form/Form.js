import { useState, useRef } from 'react';
import BemHandler from '../../utils/bem-handler';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Form.css';

const bem = new BemHandler('form');

function Form({
  onSubmit,
  fields,
  buttonText,
  replacementFormText,
  onReplaceForm,
  message,
  onValid,
}) {
  const [isValid, setIsValid] = useState(false);

  const formRef = useRef();

  const handleValid = (e) => {
    const validationMap = Array
      .from(formRef.current.elements)
      .map((el) => el.validity.valid);
    setIsValid(validationMap.every((el) => el));
    onValid();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const createField = ({
    label,
    type = 'text',
    placeholder = '',
    validation,
    customMessage,
    onChange,
  }, index) => (
    <Input
      key={index}
      className={bem.get('input')}
      type={type}
      label={label}
      placeholder={placeholder}
      underline
      onChange={onChange}
      {...validation}
      customMessage={customMessage}
    />
  );

  return (
    <form
      onChange={handleValid}
      className={bem.get(null)}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {fields.map(createField)}
      {message && (
        <span className={bem.get('message')}>
          {message}
        </span>
      )}
      <Button
        className={bem.get('button')}
        disabled={!isValid}
        type="submit"
        radius="large"
      >
        {buttonText}
      </Button>
      {!!replacementFormText && (
        <p className={bem.get('alternative')}>
          или&nbsp;
          <span
            className={bem.get('alternative-span')}
            onClick={onReplaceForm}>
            {replacementFormText}
          </span>
        </p>
      )}
    </form>
  );
}

export default Form;
