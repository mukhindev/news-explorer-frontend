import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import PopupInfo from '../PopupInfo/PopupInfo';
import Login from '../Login/Login';
import getNews from '../../utils/newsApi';
import { signUp, signIn } from '../../utils/mainApi';
import { ReactComponent as SignOutIcon } from '../../images/sign-out.svg';
import { ReactComponent as NotFountIcon } from '../../images/not-found.svg';
import BemHandler from '../../utils/bem-handler';
import './App.css';

const bem = new BemHandler('app');

function App() {
  const [menu, setMenu] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [formMessage, setFormMessage] = useState('');
  const [news, setNews] = useState([]);
  const [searchMessage, setSearchMessage] = useState(null);
  const [pageTheme, setPageThene] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenPopupInfo, setIsOpenPopupInfo] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const { pathname } = useLocation();

  const getMenu = (menu1, auth1) => (auth1
    ? menu1
    : menu1.filter((item) => item.auth !== true)
  );

  useEffect(() => {
    const localArticles = localStorage.getItem('articles');
    if (!localArticles) return;
    setNews(JSON.parse(localArticles));
  }, []);

  useEffect(() => {
    if (pathname === '/') setPageThene('dark');
    else setPageThene('');
  }, [pathname]);

  useEffect(() => {
    const buttonSignUp = {
      type: 'button',
      onClick: () => setIsOpenRegister(true),
      name: 'Авторизоваться',
    };

    const buttonSignOut = {
      type: 'button',
      onClick: () => setLoggedIn(false),
      name: 'Сергей',
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
      !loggedIn ? buttonSignUp : buttonSignOut,
    ];

    setMenu(getMenu(initialMenu, loggedIn));
  }, [loggedIn]);

  const handleSearchSubmit = async (search) => {
    setNews([]);
    setSearchMessage(null);
    setIsLoading(true);
    try {
      const { articles } = await getNews(search);
      if (articles.length) {
        setNews(articles);
        localStorage.setItem('articles', JSON.stringify(articles));
      } else {
        setSearchMessage({
          icon: NotFountIcon,
          title: 'Ничего не\u00A0найдено',
          subtitle: 'К сожалению по\u00A0вашему запросу ничего не\u00A0найдено.',
        });
        setNews([]);
        localStorage.setItem('articles', JSON.stringify([]));
      }
    } catch (error) {
      setSearchMessage({
        icon: NotFountIcon,
        title: 'Ошибка',
        subtitle: 'Во время запроса произошла ошибка. Возможно, проблема с\u00A0соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
      });
      setNews([]);
      localStorage.setItem('articles', JSON.stringify([]));
    }
    return setIsLoading(false);
  };

  const closeAllPopups = () => {
    setIsOpenRegister(false);
    setIsOpenLogin(false);
    setIsOpenPopupInfo(false);
    setFormMessage('');
  };

  const handleRegister = async ({ email, password, name }) => {
    try {
      const { user } = await signUp({ email, password, name });
      if (user) {
        closeAllPopups();
        setIsOpenPopupInfo(true);
      }
    } catch (error) {
      const { message } = await error;
      if (message) setFormMessage(message);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const { user } = await signIn({ email, password });
      if (user) {
        setCurrentUser(user);
        setLoggedIn(true);
      }
    } catch (error) {
      const { message } = await error;
      if (message) setFormMessage(message);
    }
  };

  return (
    <div className={bem.get(null)}>
      <Header
        theme={pageTheme}
        menu={menu}
        blocked={isOpenRegister}
      />
      <Switch>
        <Route path="/" exact>
          <Main
            theme={pageTheme}
            cards={news}
            message={searchMessage}
            loggedIn={loggedIn}
            isLoading={isLoading}
            onSearchSubmit={handleSearchSubmit}
          />
        </Route>
        <Route path="/saved-news">
          <SavedNews
            cards={[]}
            loggedIn={loggedIn}
            isLoading={isLoading}
          />
        </Route>
      </Switch>
      <Footer />
      <Register
        isOpen={isOpenRegister}
        onClose={closeAllPopups}
        onSubmit={handleRegister}
        formMessage={formMessage}
        onValid={() => setFormMessage('')}
      />
      <PopupInfo
        isOpen={isOpenPopupInfo}
        onClose={closeAllPopups}
        title="Пользователь успешно зарегистрирован!"
        linkText="Войти"
        onLinkClick={() => {
          closeAllPopups();
          setIsOpenLogin(true);
        }}
      />
      <Login
        isOpen={isOpenLogin}
        onClose={closeAllPopups}
        onSubmit={handleLogin}
        formMessage={formMessage}
        onValid={() => setFormMessage('')}
      />
    </div>
  );
}

export default App;
