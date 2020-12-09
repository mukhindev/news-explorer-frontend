import Api from './Api';
import { MAIN_API_SERVER } from './constants';

const mainApi = new Api(MAIN_API_SERVER);

export const signUp = ({ email, password, name }) => mainApi.post({
  handle: '/signup',
  body: { email, password, name },
});

export const signIn = ({ email, password }) => mainApi.post({
  handle: '/signin',
  body: { email, password },
});

export const getMe = ({ token }) => mainApi.get({
  handle: '/users/me',
  token,
});

export const createActicle = ({
  token,
  keyword,
  title,
  text,
  date,
  source,
  link,
  image,
}) => mainApi.post({
  handle: '/articles',
  token,
  body: {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  },
});

export const getSavedArticles = ({ token }) => mainApi.get({
  handle: '/articles',
  token,
});

export const deteleSavedArticle = ({ id, token }) => mainApi.delete({
  handle: `/articles/${id}`,
  token,
});
