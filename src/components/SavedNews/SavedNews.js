import Container from '../Container/Container';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import BemHandler from '../../utils/bem-handler';
import './SavedNews.css';

const bem = new BemHandler('saved-news');

function SavedNews({ cards, loggedIn }) {
  const savedCards = cards.map((card) => ({
    ...card,
    tag: 'Природа',
    isMarked: true,
  }));

  return (
    <main className={bem.get(null)}>
      <SavedNewsHeader
        username="Сергей"
        tags={['Природа', 'Тайга', 'Слово-3', 'Слово-4', 'Слово-5']}
      />
      <Container className={bem.get('container')}>
        <NewsCardList
          cards={savedCards}
          loggedIn={loggedIn}
        />
      </Container>
    </main>
  );
}

export default SavedNews;
