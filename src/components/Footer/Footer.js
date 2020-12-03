import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import BemHandler from '../../utils/bem-handler';
import githubIcon from '../../images/footer-github-icon.svg';
import facebookIcon from '../../images/footer-facebook-icon.svg';
import './Footer.css';

const bem = new BemHandler('footer');

function Footer() {
  const copyright = (
    <p
      className={bem.get('copyright')}
    >
      &copy; 2020 Сергей Мухин, Powered&nbsp;by&nbsp;News&nbsp;API
    </p>
  );

  const links = (
    <ul
      className={bem.get('links')}
    >
      <li
        className={bem.get('item')}
      >
        <Link to="/" className={bem.get('link')}>
          Главная
        </Link>
      </li>
      <li
        className={bem.get('item')}
      >
        <a
          className={bem.get('link')}
          href="https://praktikum.yandex.ru"
          target="_blank"
          rel="noreferrer"
        >
          Яндекс.Практикум
        </a>
      </li>
    </ul>
  );

  const socialLinks = (
    <ul
      className={bem.get('social-links')}
    >
      <li
        className={bem.get('social-item')}
      >
        <a
          className={bem.get('social-link')}
          href="https://github.com/mukhindev/news-explorer-frontend"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className={bem.get('social-icon')}
            src={githubIcon}
            lang="en"
            alt="github"
          />
        </a>
      </li>
      <li
        className={bem.get('social-item')}
      >
        <a
          className={bem.get('social-link')}
          href="https://ru-ru.facebook.com/yandex.praktikum"
          target="_blank"
          rel="noreferrer"
        >
          <img
          className={bem.get('social-icon')}
            src={facebookIcon}
            lang="en"
            alt="facebook"
          />
        </a>
      </li>
    </ul>
  );

  return (
    <footer className={bem.get(null)}>
      <Container className={bem.get('container')}>
        {copyright}
        {links}
        {socialLinks}
      </Container>
    </footer>
  );
}

export default Footer;
