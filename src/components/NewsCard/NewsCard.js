import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import BemHandler from '../../utils/bem-handler';
import formatDate from '../../utils/formatDate';
import defaultImage from '../../images/default.jpg';
import './NewsCard.css';

const bem = new BemHandler('news-card');

function NewsCard({
  card,
  loggedIn,
  onAuth,
  onMark,
  onDelete,
}) {
  const {
    _id: id,
    keyword,
    title,
    text,
    date,
    source,
    link,
    image: acticleImage,
    isShowKeyword,
  } = card;
  const [image, setImage] = useState(acticleImage);
  const { pathname } = useLocation();

  const keywordButton = (
    <Button
      type="button"
      radius="small"
      className={bem.get('keyword-button')}
    >
      {keyword}
    </Button>
  );

  const markButtonUnauth = (
    <Button
      type="button"
      radius="small"
      className={bem.get('mark-button', { caption: true })}
      icon="mark"
      caption={'Войдите, чтобы сохранять статьи'}
      onClick={onAuth}
    />
  );

  const markButtonAuth = (
    <Button
      type="button"
      radius="small"
      className={bem.get('mark-button')}
      icon="mark"
      onClick={() => onMark(card)}
    />
  );

  const markButton = !loggedIn
    ? markButtonUnauth
    : markButtonAuth;

  const unmarkButton = (
    <Button
      type="button"
      radius="small"
      className={bem.get('mark-button', { caption: true })}
      icon={pathname === '/' ? 'marked' : 'trash'}
      caption={'Убрать из сохранённых'}
      onClick={() => onDelete(card)}
    />
  );

  const onImageError = () => {
    setImage(defaultImage);
  };

  return (
    <article
      className={bem.get(null)}
    >
      <div className={bem.get('header')} >
        <img
          className={bem.get('image')}
          src={image || defaultImage}
          alt={title}
          onError={onImageError}
        />
        <div className={bem.get('toolbar')}>
          {!!isShowKeyword && keywordButton}
          {!id ? markButton : unmarkButton}
        </div>
      </div>
      <div className={bem.get('body')}>
        <span className={bem.get('date')}>{formatDate(new Date(date))}</span>
        <h2 className={bem.get('title')}>{title}</h2>
        <p className={bem.get('annotation')}>{text}</p>
        <span className={bem.get('source')}>{source.name}</span>
      </div>
    </article>
  );
}

export default NewsCard;
