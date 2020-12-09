import { useState, useEffect, useCallback } from 'react';
import {
  Switch, Route, Redirect, useLocation,
} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Info from '../Info/Info';
import Login from '../Login/Login';
import getNews from '../../utils/newsApi';
import {
  signUp,
  signIn,
  getMe,
  createActicle,
  getSavedArticles,
  deteleSavedArticle,
} from '../../utils/mainApi';
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
  const [savedNews, setSavedNews] = useState([]);
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

  const fetchSavedArticles = useCallback(async () => {
    try {
      const { articles } = await getSavedArticles({ token: localStorage.getItem('token') });
      if (articles) setSavedNews(articles);
    } catch (error) {
      setOpenedPopup('error-not-responding');
    }
  }, []);

  useEffect(() => {
    if (loggedIn && pathname === '/saved-news') {
      fetchSavedArticles();
    }
  }, [pathname, loggedIn, fetchSavedArticles]);

  const handleSearchSubmit = async (search) => {
    if (!search.length) {
      return setSearchMessage({
        title: 'Введите тему новости',
        subtitle: 'Необходимо ввести ключевое слово для поиска новостей',
      });
    }
    setNews([]);
    setSearchMessage(null);
    setIsLoading(true);
    try {
      const { articles } = await getNews(search);
      if (articles.length) {
        const mapArticles = articles.map((article) => {
          const {
            title,
            description,
            publishedAt,
            source,
            url,
            urlToImage,
          } = article;
          return {
            keyword: search,
            title,
            text: description,
            date: publishedAt,
            source: source.name,
            link: url,
            image: urlToImage || 'https://newsexplorer.mukhin.dev/images/default.jpg',
          };
        });
        setNews(mapArticles);
        localStorage.setItem('articles', JSON.stringify(mapArticles));
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
    setNews([]);
    setSavedNews([]);
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

  const onMarkCard = async (card) => {
    const newsIndex = (news.indexOf(card));
    try {
      const { article } = await createActicle({
        token: localStorage.getItem('token'),
        ...card,
      });
      if (article) {
        const updatedNews = [...news];
        updatedNews[newsIndex] = article;
        setNews(updatedNews);
        localStorage.setItem('articles', JSON.stringify(updatedNews));
      }
    } catch (error) {
      setOpenedPopup('error-not-saved');
    }
  };

  const onDeleteCard = async ({ _id: id }) => {
    try {
      const { article } = await deteleSavedArticle({
        token: localStorage.getItem('token'),
        id,
      });
      if (article) {
        const updatedSavedNews = savedNews.filter(({ _id }) => _id !== id);
        setSavedNews(updatedSavedNews);
        const index = news.findIndex(({ _id }) => _id === id);
        if (index !== -1) {
          const updatedFoundNews = [...news];
          // TODO: Избавиться от ошибки eslint
          // eslint-disable-next-line no-underscore-dangle
          updatedFoundNews[index]._id = null;
          setNews(updatedFoundNews);
          localStorage.setItem('articles', JSON.stringify(updatedFoundNews));
        }
      }
    } catch (error) {
      setOpenedPopup('error-not-deleted');
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
      case 'error-not-saved':
        return (
          <Info
            isOpen
            onClose={closePopup}
            title="Ошибка сервера. Не могу сохранить эту новость!"
            linkText="Закрыть"
            onClick={() => closePopup()}
          />
        );
      case 'error-not-deleted':
        return (
          <Info
            isOpen
            onClose={closePopup}
            title="Ошибка сервера. Не могу удалить эту новость!"
            linkText="Закрыть"
            onClick={() => closePopup()}
          />
        );
      case 'error-not-responding':
        return (
          <Info
            isOpen
            onClose={closePopup}
            title="Ошибка сервера. Нет ответа от сервера!"
            linkText="Закрыть"
            onClick={() => closePopup()}
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
              onAuth={() => setOpenedPopup('register')}
              onMark={onMarkCard}
              onDelete={onDeleteCard}
            />
          </Route>
          <ProtectedRoute
            path="/saved-news"
            onRedirect={() => setOpenedPopup('register')}
            component={SavedNews}
            cards={savedNews}
            loggedIn={loggedIn}
            isLoading={isLoading}
            onDelete={onDeleteCard}
          />
          <Route path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer />
        {getPopup(openedPopup)}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
