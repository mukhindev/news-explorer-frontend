import Container from '../Container/Container';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import BemHandler from '../../utils/bem-handler';
import './SavedNews.css';
import Preloader from '../Preloader/Preloader';

const bem = new BemHandler('saved-news');

function SavedNews({
  cards,
  loggedIn,
  onDelete,
}) {
  if (!loggedIn) {
    return (
      <main className={bem.get(null)}>
        <Container className={bem.get('container')}>
          <Preloader className={bem.get('preloader')} />
        </Container>
      </main>
    );
  }

  return (
    <main className={bem.get(null)}>
      <SavedNewsHeader
        cards={cards}
      />
      {!!cards.length && (
        <Container className={bem.get('container')}>
          <NewsCardList
            cards={cards}
            loggedIn={loggedIn}
            onDelete={onDelete}
            isShowKeyword
          />
        </Container>
      )}
    </main>
  );
}

export default SavedNews;
