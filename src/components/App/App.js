import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import { ReactComponent as SignOutIcon } from '../../images/sign-out.svg';
import BemHandler from '../../utils/bem-handler';
import './App.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

// Временные данные
const fakeData = {
  cards: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80',
      date: '2 августа, 2019',
      title: 'Национальное достояние – парки',
      annotation: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
      source: 'Лента.ру',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1582409836310-37c46af8dfee?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80',
      date: '2 августа, 2019',
      title: 'Лесные огоньки: история одной фотографии',
      annotation: 'Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.',
      source: 'Медуза',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80',
      date: '2 августа, 2019',
      title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
      annotation: 'Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...',
      source: 'Риа',
    },
  ],
};

const bem = new BemHandler('app');

function App() {
  const [menu, setMenu] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [pageTheme, setPageThene] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { pathname } = useLocation();

  const getMenu = (menu1, auth1) => (auth1
    ? menu1
    : menu1.filter((item) => item.auth !== true)
  );

  useEffect(() => {
    if (pathname === '/') setPageThene('dark');
    else setPageThene('');
  }, [pathname]);

  useEffect(() => {
    const buttonSignUp = {
      type: 'button',
      onClick: () => setIsPopupOpen(true),
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

  const handleSearchSubmit = (search) => {
    // Имитация загрузки
    setSearchResults([]);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSearchResults(fakeData.cards);
    }, 2000);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleAuthSubmit = () => {};

  return (
    <div className={bem.get(null)}>
      <Header
        theme={pageTheme}
        menu={menu}
        blocked={isPopupOpen}
      />
      <Switch>
        <Route path="/" exact>
          <Main
            theme={pageTheme}
            cards={searchResults}
            loggedIn={loggedIn}
            isLoading={isLoading}
            onSearchSubmit={handleSearchSubmit}
          />
        </Route>
        <Route path="/saved-news">
          <SavedNews
            cards={fakeData.cards}
            loggedIn={loggedIn}
            isLoading={isLoading}
          />
        </Route>
      </Switch>
      <Footer />
      <PopupWithForm
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        onSubmit={handleAuthSubmit}
      />
    </div>
  );
}

export default App;
