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
}) {
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
      {!!cards.length && (
        <Container className={bem.get('container')}>
          <h2 className={bem.get('title')}>Результаты поиска</h2>
          <NewsCardList
            cards={cards}
            loggedIn={loggedIn}
          />
          <Button
            className={bem.get('more-button')}
            radius="large">Показать ещё
          </Button>
        </Container>
      )}
      <About />
    </main>
  );
}

export default Main;
