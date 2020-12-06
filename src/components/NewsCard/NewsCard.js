import Button from '../Button/Button';
import BemHandler from '../../utils/bem-handler';
import formatDate from '../../utils/formatDate';
import './NewsCard.css';

const bem = new BemHandler('news-card');

function NewsCard({
  card, loggedIn,
}) {
  const {
    urlToImage: image,
    title,
    publishedAt: date,
    description: annotation,
    source,
    url,
    tag,
    isMarked,
  } = card;

  const tagButton = (
    <Button
      type="button"
      radius="small"
      className={bem.get('tag-button')}
    >
      {tag}
    </Button>
  );

  const markButton = (
    <>
      <Button
        type="button"
        radius="small"
        className={bem.get('mark-button', { caption: !loggedIn })}
        icon="mark"
        caption={!loggedIn ? 'Войдите, чтобы сохранять статьи' : null}
      />
    </>
  );

  const unmarkButton = (
    <>
      <Button
        type="button"
        radius="small"
        className={bem.get('mark-button', { caption: true })}
        icon="trash"
        caption={'Убрать из сохранённых'}
      />
    </>
  );

  return (
    <article className={bem.get(null)}>
      <a
        className={bem.get('link')}
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <div className={bem.get('header')} >
          <img
            className={bem.get('image')}
            src={image}
            alt={title}
          />
          <div className={bem.get('toolbar')}>
            {!!tag && tagButton}
            {!isMarked ? markButton : unmarkButton}
          </div>
        </div>
        <div className={bem.get('body')}>
          <span className={bem.get('date')}>{formatDate(new Date(date))}</span>
          <h2 className={bem.get('title')}>{title}</h2>
          <p className={bem.get('annotation')}>{annotation}</p>
          <span className={bem.get('source')}>{source.name}</span>
        </div>
      </a>
    </article>
  );
}

export default NewsCard;
