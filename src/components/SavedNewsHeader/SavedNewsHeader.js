import { useContext } from 'react';
import Container from '../Container/Container';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import BemHandler from '../../utils/bem-handler';
import './SavedNewsHeader.css';

const bem = new BemHandler('saved-news-header');

function SavedNewsHeader({
  cards = [],
}) {
  const { name: username } = useContext(CurrentUserContext);
  const keywords = cards.map(({ keyword }) => keyword);

  const countedKeywords = keywords.reduce((prevVal, item) => {
    const prevValue = prevVal;
    if (!prevValue[item]) prevValue[item] = 1;
    else prevValue[item] += 1;
    return prevValue;
  }, {});

  const formatedKeywords = Object.entries(countedKeywords).map((el) => ({
    keyword: el[0],
    count: el[1],
  }));

  const sortedKeywords = formatedKeywords.sort((a, b) => b.count - a.count);
  const simplifiedKeywordsArray = sortedKeywords.map((el) => el.keyword);

  const getKeywordsList = (keywordsArray) => {
    if (keywordsArray.length > 0 && keywordsArray.length <= 3) {
      return (
        <p className={bem.get('key-words')}>
          По ключевым словам:
          <span className={bem.get('tags')}> {simplifiedKeywordsArray.slice(0, 3).join(', ')}</span>
        </p>
      );
    }
    if (keywordsArray.length > 3) {
      return (
        <p className={bem.get('key-words')}>
          По ключевым словам:
          <span className={bem.get('tags')}> {simplifiedKeywordsArray.slice(0, 2).join(', ')}</span>
          {simplifiedKeywordsArray.length > 2 && (
            <> и
              <span className={bem.get('tags')}> {simplifiedKeywordsArray.length - 2}-м другим</span>
            </>
          )}
        </p>
      );
    }
    return null;
  };

  return (
    <div className={bem.get(null)}>
      <Container className={bem.get('container')}>
        <h2 className={bem.get('title')}>Сохранённые статьи</h2>
        <p className={bem.get('counter')}>{username}, у вас {cards.length} сохранённых статей</p>
        {getKeywordsList(simplifiedKeywordsArray)}
      </Container>
    </div>
  );
}

export default SavedNewsHeader;
