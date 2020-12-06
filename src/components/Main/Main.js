import { useState, useEffect } from 'react';
import Container from '../Container/Container';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import BemHandler from '../../utils/bem-handler';
import './Main.css';

const bem = new BemHandler('main');

function Main({
  cards,
  theme,
  onSearchSubmit,
  loggedIn,
  isLoading,
  message,
}) {
  const MessageIcon = message?.icon || (() => null);
  const [numberOfCards, setNumberOfCards] = useState(3);

  useEffect(() => {
    setNumberOfCards(3);
  }, [cards]);

  return (
    <main className={bem.get(null)}>
      <SearchForm
        className={bem.get('search-form')}
        theme={theme}
        onSubmit={onSearchSubmit}
        background
      />
      {isLoading && (
        <Container className={bem.get('container')}>
          <Preloader className={bem.get('preloader')} />
          <p className={bem.get('preloader-caption')}>Идёт поиск новостей...</p>
        </Container>
      )}
      {message && (
        <Container className={bem.get('container')}>
          <MessageIcon className={bem.get('message-icon')} />
          <p className={bem.get('message-title')} >
            {message.title}
          </p>
          <p className={bem.get('message-subtitle')} >
            {message.subtitle}
          </p>
        </Container>
      )}
      {!!cards.length && (
        <Container className={bem.get('container')}>
          <h2 className={bem.get('title')}>Результаты поиска</h2>
          <NewsCardList
            cards={cards.slice(0, numberOfCards)}
            loggedIn={loggedIn}
          />
          {cards.length >= numberOfCards && (
            <Button
              className={bem.get('more-button')}
              radius="large"
              onClick={() => setNumberOfCards(numberOfCards + 3)}
            >
              Показать ещё
            </Button>
          )}
        </Container>
      )}
      <About />
    </main>
  );
}

export default Main;
