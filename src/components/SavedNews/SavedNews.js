import Container from '../Container/Container';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import BemHandler from '../../utils/bem-handler';
import './SavedNews.css';

const bem = new BemHandler('saved-news');

function SavedNews({
  cards,
  loggedIn,
  onDelete,
}) {
  return (
    <main className={bem.get(null)}>
      <SavedNewsHeader
        tags={['Природа', 'Тайга', 'Слово-3', 'Слово-4', 'Слово-5']}
      />
      <Container className={bem.get('container')}>
        <NewsCardList
          cards={cards}
          loggedIn={loggedIn}
          onDelete={onDelete}
          isShowKeyword
        />
      </Container>
    </main>
  );
}

export default SavedNews;
