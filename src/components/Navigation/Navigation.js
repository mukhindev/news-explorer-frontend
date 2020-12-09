import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import { ReactComponent as SignOutIcon } from '../../images/sign-out.svg';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import BemHandler from '../../utils/bem-handler';
import './Navigation.css';

const bem = new BemHandler('navigation');

function Navigation({
  theme,
  burger,
  onAuth,
  onLogOut,
}) {
  const [menu, setMenu] = useState([]);
  const { name: username } = useContext(CurrentUserContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const buttonSignUp = {
      type: 'button',
      onClick: onAuth,
      name: 'Авторизоваться',
    };

    const buttonSignOut = {
      type: 'button',
      onClick: onLogOut,
      name: username && username.split(' ')[0],
      iconComponent: SignOutIcon,
    };

    const initialMenu = [
      {
        type: 'link',
        to: '/',
        name: 'Главная',
      },
      {
        type: 'link',
        to: '/saved-news',
        name: 'Сохранённые статьи',
        auth: true,
      },
      !username ? buttonSignUp : buttonSignOut,
    ];

    const authMenu = username
      ? initialMenu
      : initialMenu.filter((item) => item.auth !== true);

    setMenu(authMenu);
  }, [username, onAuth, onLogOut]);

  const getMenuItem = ({
    type,
    to,
    onClick,
    name,
    iconComponent,
  }, index) => {
    if (type === 'link') {
      return (
        <li
          className={bem.get('item', {
            underline: pathname === to,
            theme,
            burger,
          })}
          key={index}
        >
          <Link
            className={bem.get('link', { theme })}
            to={to}
          >
            {name}
          </Link>
        </li>
      );
    }

    if (type === 'button') {
      return (
        <li
          className={bem.get('item', { theme, burger })}
          key={index}
        >
          <Button
            onClick={onClick}
            theme={theme}
            radius="large"
            outline
            className={bem.get('button', { burger })}
            iconComponent={iconComponent}
          >
            {name}
          </Button>
        </li>
      );
    }
    return null;
  };

  return (
    <nav className={bem.get(null, { burger })}>
      <ul className={bem.get('menu', { burger })}>
        {menu.map((item, index) => getMenuItem(item, index))}
      </ul>
    </nav>
  );
}

export default Navigation;
