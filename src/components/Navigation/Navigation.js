import { Link, useLocation } from 'react-router-dom';
import BemHandler from '../../utils/bem-handler';
import Button from '../Button/Button';
import './Navigation.css';

const bem = new BemHandler('navigation');

function Navigation({ menu, theme, burger }) {
  const { pathname } = useLocation();

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
