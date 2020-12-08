import NewsCard from '../NewsCard/NewsCard';
import BemHandler from '../../utils/bem-handler';
import './NewsCardList.css';

const bem = new BemHandler('news-card-list');

function NewsCardList({
  cards,
  loggedIn,
  onAuth,
  onMark,
  onDelete,
  isShowKeyword,
  CurrentUserId,
}) {
  return (
    <div className={bem.get(null)}>
        {cards.map((card, index) => (
          <NewsCard
            key={index}
            card={card}
            loggedIn={loggedIn}
            onAuth={onAuth}
            onMark={onMark}
            onDelete={onDelete}
            isShowKeyword={isShowKeyword}
            CurrentUserId={CurrentUserId}
          />
        ))}
    </div>
  );
}

export default NewsCardList;
