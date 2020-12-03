import NewsCard from '../NewsCard/NewsCard';
import BemHandler from '../../utils/bem-handler';
import './NewsCardList.css';

const bem = new BemHandler('news-card-list');

function NewsCardList({ cards, loggedIn }) {
  return (
    <div className={bem.get(null)}>
        {cards.map((card) => (
          <NewsCard
            key={card.id}
            card={card}
            loggedIn={loggedIn}
          />
        ))}
    </div>
  );
}

export default NewsCardList;
