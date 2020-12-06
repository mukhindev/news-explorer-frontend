import { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Info from '../Info/Info';
import Login from '../Login/Login';
import getNews from '../../utils/newsApi';
import { signUp, signIn, getMe } from '../../utils/mainApi';
import { ReactComponent as NotFountIcon } from '../../images/not-found.svg';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import BemHandler from '../../utils/bem-handler';
import './App.css';

const bem = new BemHandler('app');

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [openedPopup, setOpenedPopup] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [news, setNews] = useState([]);
  const [searchMessage, setSearchMessage] = useState(null);
  const [pageTheme, setPageThene] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const localArticles = localStorage.getItem('articles');
    if (!localArticles) return;
    setNews(JSON.parse(localArticles));
  }, []);

  useEffect(() => {
    if (pathname === '/') setPageThene('dark');
    else setPageThene('');
  }, [pathname]);

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

  const closePopup = () => {
    setOpenedPopup('');
    setFormMessage('');
  };

  const checkToken = useCallback(async () => {
    if (localStorage.getItem('token')) {
      try {
        const { user } = await getMe({ token: localStorage.getItem('token') });
        if (user) {
          setLoggedIn(true);
          setCurrentUser(user);
          closePopup();
        }
      } catch (error) {
        handleLogOut();
      }
    }
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
  };

  const handleRegister = async ({ email, password, name }) => {
    try {
      const { user } = await signUp({ email, password, name });
      if (user) setOpenedPopup('info-success');
    } catch (error) {
      const { message } = await error;
      if (message) setFormMessage(message);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const { token } = await signIn({ email, password });
      if (token) {
        closePopup();
        localStorage.setItem('token', token);
        checkToken();
      }
    } catch (error) {
      const { message } = await error;
      if (message) setFormMessage(message);
    }
  };

  const getPopup = (name) => {
    switch (name) {
      case 'register':
        return (
          <Register
            isOpen
            onClose={closePopup}
            onSubmit={handleRegister}
            formMessage={formMessage}
            onValid={() => setFormMessage('')}
            onReplaceForm={() => {
              setFormMessage('');
              setOpenedPopup('login');
            }}
          />
        );
      case 'login':
        return (
          <Login
            isOpen
            onClose={closePopup}
            onSubmit={handleLogin}
            formMessage={formMessage}
            onValid={() => setFormMessage('')}
            onReplaceForm={() => {
              setFormMessage('');
              setOpenedPopup('register');
            }}
          />
        );
      case 'info-success':
        return (
          <Info
            isOpen
            onClose={closePopup}
            title="Пользователь успешно зарегистрирован!"
            linkText="Войти"
            onClick={() => setOpenedPopup('login')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={bem.get(null)}>
        <Header
          theme={pageTheme}
          blocked={openedPopup}
          onAuth={() => setOpenedPopup('register')}
          onLogOut={handleLogOut}
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
        {getPopup(openedPopup)}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
