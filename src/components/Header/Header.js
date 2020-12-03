import { useState, useEffect } from 'react';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import BemHandler from '../../utils/bem-handler';
import './Header.css';

const MOBILE_WIDTH = 720;
const bem = new BemHandler('header');

function Header({ theme, menu, blocked }) {
  const [burger, setBurger] = useState(false);
  const [isBurgerOpened, isSetBurgerOpened] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= MOBILE_WIDTH) setBurger(true);
    const resizeListener = (e) => {
      if (e.target.innerWidth <= MOBILE_WIDTH) {
        setBurger(true);
      } else {
        setBurger(false);
        isSetBurgerOpened(false);
      }
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  const navigation = !burger
    ? (<Navigation menu={menu} theme={theme} />)
    : (
      <button
        className={bem.get('burger-buttom', {
          theme: isBurgerOpened ? 'dark' : theme,
          active: isBurgerOpened,
          blocked,
        })}
        onClick={() => isSetBurgerOpened(!isBurgerOpened)}
      />
    );

  return (
    <header className={bem.get(null, { theme, blocked })}>
      <Container className={bem.get('container', { theme })}>
        <Logo theme={isBurgerOpened ? 'dark' : theme} />
        {navigation}
      </Container>
      {isBurgerOpened && (
        <Container className={bem.get('container', { burger: isBurgerOpened })}>
          <Navigation menu={menu} theme={'dark'} burger />
        </Container>
      )}
    </header>
  );
}

export default Header;
