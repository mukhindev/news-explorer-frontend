import Api from './Api';

const mainApi = new Api('https://api.newsexplorer.mukhin.dev');

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
