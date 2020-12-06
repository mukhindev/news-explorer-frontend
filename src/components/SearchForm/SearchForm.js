import { useState } from 'react';
import Container from '../Container/Container';
import Input from '../Input/Input';
import Button from '../Button/Button';
import BemHandler from '../../utils/bem-handler';
import './SearchForm.css';

const bem = new BemHandler('search-form');

function SearchForm({
  theme,
  background,
  onSubmit,
  className: mix,
}) {
  const [search, setSearch] = useState('');

  const handleInput = (value) => {
    setSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(search);
  };

  return (
    <section className={bem.get(null, { theme, background }, mix)}>
      <Container className={bem.get('container')}>
        <h2 className={bem.get('title')}>
          Что творится в&nbsp;мире?
        </h2>
        <p className={bem.get('subtitle')}>
          Находите самые свежие статьи на&nbsp;любую тему
          и&nbsp;сохраняйте в&nbsp;своём личном кабинете.
        </p>
        <form
          className={bem.get('form')}
          onSubmit={handleSubmit}
          noValidate
        >
          <Input
            className={bem.get('input')}
            type="text"
            placeholder="Введите тему новости"
            radius="large"
            onChange={handleInput}
            required
            search
            noValidate
          />
          <Button
            className={bem.get('button')}
            type="submit"
            radius="large"
          >Искать</Button>
        </form>
      </Container>
    </section>
  );
}

export default SearchForm;
