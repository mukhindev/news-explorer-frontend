import { useContext } from 'react';
import Container from '../Container/Container';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import BemHandler from '../../utils/bem-handler';
import './SavedNewsHeader.css';

const bem = new BemHandler('saved-news-header');

function SavedNewsHeader({
  tags = [],
}) {
  const { name: username } = useContext(CurrentUserContext);

  return (
    <div className={bem.get(null)}>
      <Container className={bem.get('container')}>
        <h2 className={bem.get('title')}>Сохранённые статьи</h2>
        <p className={bem.get('counter')}>{username}, у вас {tags.length} сохранённых статей</p>
        <p className={bem.get('key-words')}>
          По ключевым словам:
          <span className={bem.get('tags')}> {tags.slice(0, 2).join(', ')}</span>
          {tags.length > 2 && <> и <span className={bem.get('tags')}>{tags.length - 2}-м другим</span></>}
        </p>
      </Container>
    </div>
  );
}

export default SavedNewsHeader;
