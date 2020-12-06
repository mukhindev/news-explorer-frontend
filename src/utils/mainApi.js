import Api from './Api';

const mainApi = new Api('https://api.newsexplorer.mukhin.dev');

export const signUp = (user) => mainApi.post({
  handle: '/signup',
  body: user,
});

export const signIn = (user) => mainApi.post({
  handle: '/signin',
  body: user,
});
